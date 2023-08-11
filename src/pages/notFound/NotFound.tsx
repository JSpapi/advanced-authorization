import { Typography } from "@mui/material";
import noResult from "../../assets/no-result.png";
export const NotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",

        marginTop: "200px",
      }}
    >
      <Typography className="regular" variant="h4" style={{ marginBottom: 20 }}>
        PAGE NOT FOUND
      </Typography>
      <img src={noResult} alt="no result" />
    </div>
  );
};
