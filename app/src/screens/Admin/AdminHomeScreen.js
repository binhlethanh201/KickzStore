import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken, removeToken } from "../../utils/auth";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import styles from "./styles";

const getMonthLabel = (monthNumber) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthNumber - 1] || 'N/A';
};

const getReportLabel = (item) => {
  if (item.month) return getMonthLabel(item.month);
  if (item.quarter) return `Q${item.quarter}`;
  if (item.year) return item.year.toString();
  return 'N/A';
};

const getReportTitle = (type) => {
  switch (type) {
    case 'month': return 'Monthly';
    case 'quarter': return 'Quarterly';
    case 'year': return 'Yearly';
    default: return 'Report';
  }
};

const formatCurrency = (num) => {
  if (num === null || num === undefined) return "...";
  return `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

const formatNumber = (num) => {
  if (num === null || num === undefined) return "...";
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const StatCard = ({ title, value, icon, color }) => {
  const isDarkMode = useColorScheme() === "dark";
  const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
  const valueColor = color || (isDarkMode ? "#FFFFFF" : "#111111");
  const labelColor = isDarkMode ? "#B0B0B0" : "#666666";

  return (
    <View style={[styles.statCard, { backgroundColor: cardBg }]}>
      <Ionicons name={icon} size={24} color={valueColor} />
      <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: labelColor }]}>{title}</Text>
    </View>
  );
};

const TopProductItem = ({ item }) => {
  const isDarkMode = useColorScheme() === "dark";
  const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
  const textColor = isDarkMode ? "#FFFFFF" : "#111111";
  const subtleColor = isDarkMode ? "#B0B0B0" : "#666666";

  return (
    <View style={[styles.productItem, { backgroundColor: cardBg }]}>
      <Image source={{ uri: item.img }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: textColor }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.productDetail, { color: subtleColor }]}>
          Sold: <Text style={{ color: '#27ae60', fontWeight: 'bold' }}>{formatNumber(item.totalSold)}</Text>
        </Text>
      </View>
      <Text style={[styles.productRevenue, { color: textColor }]}>{formatCurrency(item.totalRevenue)}</Text>
    </View>
  );
};

const ReportSwitcher = ({ selectedType, onSelectType }) => {
  const isDarkMode = useColorScheme() === "dark";
  const types = [
    { key: 'month', label: 'Month' },
    { key: 'quarter', label: 'Quarter' },
    { key: 'year', label: 'Year' }
  ];

  return (
    <View style={styles.switcherContainer}>
      {types.map(type => {
        const isActive = selectedType === type.key;
        const activeBg = isDarkMode ? "#3498db" : "#1a237e";
        const inactiveBg = isDarkMode ? "#2C2C2E" : "#E0E0E0";
        const activeText = isDarkMode ? "#FFFFFF" : "#FFFFFF";
        const inactiveText = isDarkMode ? "#B0B0B0" : "#666666";

        return (
          <TouchableOpacity
            key={type.key}
            style={[
              styles.switcherButton,
              { backgroundColor: isActive ? activeBg : inactiveBg }
            ]}
            onPress={() => onSelectType(type.key)}
          >
            <Text style={[
              styles.switcherButtonText,
              { color: isActive ? activeText : inactiveText }
            ]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function AdminHomeScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [orderReport, setOrderReport] = useState([]);
  const [userReport, setUserReport] = useState([]);
  const [productReport, setProductReport] = useState([]);

  const [reportType, setReportType] = useState('month');
  const [reportYear, setReportYear] = useState(new Date().getFullYear());

  const backgroundColor = isDarkMode ? "#121212" : "#F4F7FC";
  const textColor = isDarkMode ? "#FFFFFF" : "#111111";

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "Authentication token not found.");
        handleLogout();
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
      const [statsRes, ordersRes, usersRes, productsRes] = await Promise.all([
        fetch("http://localhost:9999/api/admin/dashboard-stats", { headers }),
        fetch(`http://localhost:9999/api/admin/reports/orders?type=${reportType}&year=${reportYear}`, { headers }),
        fetch(`http://localhost:9999/api/admin/reports/users?type=${reportType}&year=${reportYear}`, { headers }),
        fetch("http://localhost:9999/api/admin/reports/products?limit=5", { headers }),
      ]);
      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();
      const productsData = await productsRes.json();
      if (!statsRes.ok) throw new Error(statsData.message || "Failed to fetch stats");
      if (!ordersRes.ok) throw new Error(ordersData.message || "Failed to fetch order report");
      if (!usersRes.ok) throw new Error(usersData.message || "Failed to fetch user report");
      if (!productsRes.ok) throw new Error(productsData.message || "Failed to fetch product report");
      setStats(statsData);
      setOrderReport(ordersData);
      setUserReport(usersData);
      setProductReport(productsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      Alert.alert("Error", error.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchDashboardData();
    }, [reportType, reportYear])
  );
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await removeToken();
          navigation.navigate("MainMenu");
        },
      },
    ]);
  };

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    backgroundGradientFrom: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    backgroundGradientTo: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    decimalPlaces: 0,
    color: (opacity = 1) => isDarkMode ? `rgba(52, 152, 219, ${opacity})` : `rgba(26, 35, 126, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: isDarkMode ? "#3498db" : "#1a237e",
    },
  };

  const formattedOrderReport = orderReport.map(item => ({
    ...item,
    label: getReportLabel(item),
  }));
  const revenueChartData = {
    labels: formattedOrderReport.map(item => item.label),
    datasets: [{
      data: formattedOrderReport.map(item => item.totalRevenue),
    }],
  };
  const isRevenueDataEmpty = !revenueChartData.labels || revenueChartData.labels.length === 0;

  const formattedUserReport = userReport.map(item => ({
    ...item,
    label: getReportLabel(item),
  }));
  const userChartData = {
    labels: formattedUserReport.map(item => item.label),
    datasets: [{
      data: formattedUserReport.map(item => item.count),
    }],
  };
  const isUserDataEmpty = !userChartData.labels || userChartData.labels.length === 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>Dashboard</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={isDarkMode ? "#FFFFFF" : "#16A34A"} style={{ marginTop: 50 }} />
        ) : (
          <>
            <View style={styles.statsContainer}>
              <StatCard title="Total Revenue" value={stats ? formatCurrency(stats.totalRevenue) : "..."} icon="cash-outline" color="#27ae60" />
              <StatCard title="Total Orders" value={stats ? formatNumber(stats.totalOrders) : "..."} icon="receipt-outline" color="#3498db" />
              <StatCard title="Total Users" value={stats ? formatNumber(stats.totalUsers) : "..."} icon="people-outline" color="#f39c12" />
              <StatCard title="Total Products" value={stats ? formatNumber(stats.totalProducts) : "..."} icon="cube-outline" color="#8e44ad" />
            </View>

            <View style={[styles.reportSection, { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" }]}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>
                {getReportTitle(reportType)} Revenue ({reportYear})
              </Text>
              <ReportSwitcher selectedType={reportType} onSelectType={setReportType} />

              {isRevenueDataEmpty ? (
                <Text style={{ color: isDarkMode ? "#888" : "#666", textAlign: 'center', marginVertical: 20 }}>No data available for this period.</Text>
              ) : (
                <LineChart
                  data={revenueChartData}
                  width={screenWidth - 32}
                  height={250}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yLabelsOffset={5}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                    borderRadius: 16,
                  }}
                  decorator={() => {
                    return (
                      <View>

                      </View>
                    );
                  }}
                  onDataPointClick={({ value, x, y }) => {
                    Alert.alert(`Revenue: ${formatCurrency(value)}`);
                  }}
                />
              )}
            </View>

            <View style={[styles.reportSection, { backgroundColor: 'transparent' }]}>
              <Text style={[styles.sectionTitle, { color: textColor, paddingHorizontal: 16 }]}>Top Selling Products</Text>
              {productReport.length > 0 ? (
                productReport.map(item => <TopProductItem key={item._id} item={item} />)
              ) : (
                <Text style={{ color: isDarkMode ? "#888" : "#666", paddingHorizontal: 16 }}>No product data found.</Text>
              )}
            </View>

            <View style={[styles.reportSection, { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" }]}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>
                {getReportTitle(reportType)} New Users ({reportYear})
              </Text>
              <ReportSwitcher selectedType={reportType} onSelectType={setReportType} />

              {isUserDataEmpty ? (
                <Text style={{ color: isDarkMode ? "#888" : "#666", textAlign: 'center', marginVertical: 20 }}>No data available for this period.</Text>
              ) : (
                <LineChart
                  data={userChartData}
                  width={screenWidth - 32}
                  height={250}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={chartConfig}
                  bezier
                  style={{
                    borderRadius: 16,
                  }}
                  onDataPointClick={({ value }) => {
                    Alert.alert(`New Users: ${formatNumber(value)}`);
                  }}
                />
              )}
            </View>

          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
