/*
  Menu lateral fixo da aplicação.
  Responsável pela navegação entre as páginas principais.
*/

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";

import {
  PeopleAlt,
  Category,
  ReceiptLong,
  BarChart,
  AccountBalanceWallet,
} from "@mui/icons-material";

export const DRAWER_WIDTH = 240;

const menuLinks = [
  { label: "Pessoas", path: "/pessoas", icon: <PeopleAlt /> },
  { label: "Categorias", path: "/categorias", icon: <Category /> },
  { label: "Transações", path: "/transacoes", icon: <ReceiptLong /> },
  { label: "Relatórios", path: "/relatorios", icon: <BarChart /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          backgroundColor: "#1E293B",
          color: theme.palette.common.white,
          border: "none",
          boxSizing: "border-box",
        },
      }}
    >
      <Box p={3} display="flex" alignItems="center" gap={2}>
        <AccountBalanceWallet
          sx={{ color: theme.palette.primary.main, fontSize: 26 }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
            Gastos
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              opacity: 0.8,
              display: "block",
              mt: -0.5,
            }}
          >
            Residencial
          </Typography>
        </Box>
      </Box>

      <Divider
        sx={{
          borderColor: alpha(theme.palette.common.white, 0.1),
          mx: 2,
          mb: 1,
        }}
      />

      <List sx={{ px: 1 }}>
        {menuLinks.map((item) => {
          const isActive = pathname.startsWith(item.path);

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  borderRadius: `${theme.shape.borderRadius}px`,
                  backgroundColor: isActive
                    ? alpha(theme.palette.primary.main, 0.15)
                    : "transparent",
                  color: isActive
                    ? theme.palette.primary.light
                    : theme.palette.contrastThreshold,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.common.white, 0.05),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 600 : 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
