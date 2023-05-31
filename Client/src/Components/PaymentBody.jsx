import {
  Typography,
  Box,
  TextField,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Category from "./Category/Category";
function PaymentBody() {
  return (
    <Box className="paymentContainer" my={5} sx={{ height: "200vh" }}>
      <Category />
      <Box
        className="depositeMethods"
        sx={{
          marginLeft: {
            lg: "10%",
            md: "10%",
            sm: "5%",
            xs: "1%",
          },
          marginRight: {
            lg: "10%",
            md: "10%",
            sm: "5%",
            xs: "1%",
          },
        }}
      >
        <Typography
          sx={{
            marginLeft: "50px",
            marginTop: "20px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Deposite Methods
        </Typography>
        <Accordion>
          <AccordionSummary
            id="panel1-header"
            aria-controls="panel1-content"
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#C40375 " }}
          >
            <img src="cbe.jpeg" alt="cbe" style={{ height: "80px" }} />
            <Typography sx={{ margin: "5px" }}>CBE *847#</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ margin: "20px" }}>
              CBE BIRR How to deposit money into your vamos.bet account using
              CBE Birr USSD
            </Typography>
            <Typography sx={{ margin: "20px" }}>
              እባክዎን ገንዘብ ከመላክዎ በፊት ሲቢኢ ብር (Cbe birr)የሚጠቀሙበት ስልክ ቁጥር እና ኑ ጨረታ ላይ
              የተመዘገቡበት ስልክ ቁጥር አንድ አይነት መሆኑን እርግጠኛ ይሁኑ።
            </Typography>
            <Typography sx={{ margin: "20px" }}>
              STEP 1 *847# ላይ ይደውሉ
            </Typography>
            <Typography sx={{ margin: "20px" }}>
              STEP 2 4 ቁጥርን ይጫኑ ( Buy Goods)
            </Typography>
            <Typography sx={{ margin: "20px" }}>
              STEP 3 ኑ ጨረታ ኃ.የተ.የግ.ማህበር (ኑ ጨረታ) ቲል ቁጥር ያስገቡ: 149305
            </Typography>{" "}
            <Typography sx={{ margin: "20px" }}>
              STEP 4 የገንዘቡን መጠን ያስገቡ ( ዝቅተኛ 100 ብር & ከፍተኛ 10,000 ብር)
            </Typography>
            <Typography sx={{ margin: "20px" }}>
              STEP 5 የይለፍ ቃሎን(ፒን) ያስገቡ
            </Typography>
            <Typography sx={{ margin: "20px" }}>
              STEP 6 ለማረጋገጥ 1’ን ይጫኑ ምንም አይነት ችግር የሚገጥሞት ከሆነ ወደጥሪ ማእከላችን ይደውሉ፡
              +251 946951726/ +251966003807/ +251 902312218 ልብ ይበሉ በCBE birr ገቢ
              እና ወጪ ለጊዜው የሚሰራው በስራ ሰዐት ከጠዋቱ 2:30 እስከ ምሽት 2:00 መሆኑን እናሳውቃለን
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            id="panel1-header"
            aria-controls="panel1-content"
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#0274FC" }}
          >
            <img src="telebirr.png" alt="cbe" style={{ height: "80px" }} />
            <Typography sx={{ margin: "5px" }}>Tele Birr *127#</Typography>
            <Box sx={{ height: "5px" }}></Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ margin: "20px" }}>
              Tele birr How to deposit money into your Nu chareta account using
              Tele birr
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
export default PaymentBody;
