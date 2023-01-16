import {
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  ReceiptLongOutlined,
  FormatListNumbered,
  Group,
  SchoolOutlined,
  SettingsOutlined,
  Assignment,
  Calculate,
} from "@mui/icons-material"

const navItems = [
  {
    text: "Calendar",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Schooling Info",
    icon: null,
  },
  {
    text: "Classes",
    icon: <Groups2Outlined />,
  },
  {
    text: "Summaries",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Assignments",
    icon: <Assignment />,
  },
  {
    text: "Grades",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Editor",
    icon: <Calculate />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: null,
    icon: null,
  },
  {
    text: "Account Settings",
    icon: <SettingsOutlined />,
  },
]

export default navItems
