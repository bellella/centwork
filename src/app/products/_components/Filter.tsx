import { Box, Typography, TextField, MenuItem } from "@mui/material";
import {
  ProductCategoryWithAll,
  LocationWithAll,
  ProductQuery,
} from "@/types/extendProduct";

export default function Filter({
  onSearch,
  query,
  setQuery,
}: {
  onSearch: (query: string) => void;
  query: ProductQuery;
  setQuery: (query: ProductQuery) => void;
}) {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" gap={2}>
        <TextField
          variant="standard"
          label="Search"
          value={query.keyword}
          onChange={(e) => setQuery({ ...query, keyword: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(query.keyword);
            }
          }}
        />
      </Box>

      <Box display="flex" gap={2} flexDirection="column">
        <Typography
          variant="h6"
          sx={{ borderBottom: "1px solid #e0e0e0", paddingBottom: 1 }}
        >
          Filter
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            select
            label="Category"
            value={query.category}
            onChange={(e) =>
              setQuery({
                ...query,
                category: e.target
                  .value as (typeof ProductCategoryWithAll)[number],
              })
            }
          >
            {Object.values(ProductCategoryWithAll).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box>
          <TextField
            fullWidth
            select
            label="Location"
            value={query.location}
            onChange={(e) =>
              setQuery({
                ...query,
                location: e.target.value as (typeof LocationWithAll)[number],
              })
            }
          >
            {Object.values(LocationWithAll).map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </Box>
  );
}
