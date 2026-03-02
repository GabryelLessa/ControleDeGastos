import { Box, Typography, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  onAdd: () => void;
}

export function PageHeader({ title, subtitle, onAdd }: PageHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Box>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Novo
      </Button>
    </Stack>
  );
}
