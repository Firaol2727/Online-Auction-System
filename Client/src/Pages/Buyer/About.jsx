import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavBuyer from "../../Layouts/NavBuyer";
import Footer from "../../Layouts/Footer";
const SectionHeading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(48),
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.pxToRem(36),
  },
}));

const SectionSubheading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(32),
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.pxToRem(24),
  },
}));

const SectionText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(20),
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.pxToRem(16),
  },
}));

const TeamMember = ({ name, title, image }) => (
  <Grid item xs={12} sm={3}>
    <img src={image} alt={name} style={{ width: "100%" }} />
    <SectionText align="center" sx={{ mt: 2 }}>
      {name}
    </SectionText>
    <SectionText align="center" sx={{ mb: 2 }}>
      {title}
    </SectionText>
  </Grid>
);

function About() {
  return (
    <>
      <NavBuyer />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <img src="/f1.jpg" alt="About Us" style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SectionSubheading sx={{ mb: 2 }}>Our Story</SectionSubheading>
              <SectionText sx={{ mb: 2 }}>
                Founded in 2023, our online auctioning website has quickly
                become a leading destination for collectors, dealers, and
                enthusiasts around Ethiopia. With a passion for innovation and a
                commitment to excellence, we've created a platform that connects
                buyers and sellers in a way that's fast, easy, and secure.
              </SectionText>
              <SectionText sx={{ mb: 2 }}>
                We believe that everyone should have access to the world's most
                valuable and unique items, and we're proud to offer a wide range
                of categories and products to suit every taste and budget. From
                rare antiques and fine art, to vintage jewelry and modern
                design, our auctions are carefully curated to ensure that every
                item is of the highest quality and authenticity.
              </SectionText>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mb: 8 }}>
          <SectionSubheading align="center" sx={{ mb: 4 }}>
            Our Team
          </SectionSubheading>
          <Grid container spacing={4}>
            <TeamMember
              name="Meheret fasika"
              title="UI-Designer"
              image="/h1.jpg"
            />
            <TeamMember
              name="Firaol Getachew"
              title="Full Stack developer"
              image="/fi1.jpg"
            />
            <TeamMember
              name="Liul Girma"
              title="Front end developer"
              image="/lu1.jpg"
            />
            <TeamMember
              name="Yohannes Dejene"
              title="Full stack Developer"
              image="/yo2.jpg"
            />
          </Grid>
        </Box>
        {/* <Box sx={{ mb: 8 }}>
          <SectionSubheading align="center" sx={{ mb: 4 }}>
            Our Projects
          </SectionSubheading>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <img
                src="/images/about-us-project-1.jpg"
                alt="Project 1"
                style={{ width: "100%" }}
              />
              <SectionText align="center" sx={{ mt: 2 }}>
                Project 1
              </SectionText>
              <SectionText align="center" sx={{ mb: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                gravida orci ac massa placerat, sit amet bibendum ex
                ullamcorper.
              </SectionText>
            </Grid>
            <Grid item xs={12} sm={4}>
              <img
                src="/images/about-us-project-2.jpg"
                alt="Project 2"
                style={{ width: "100%" }}
              />
              <SectionText align="center" sx={{ mt: 2 }}>
                Project 2
              </SectionText>
              <SectionText align="center" sx={{ mb: 2 }}>
                Sed nec est id elit sodales suscipit. Nulla facilisi. Integer
                felis dui, bibendum sit amet ultricies id, aliquet eu velit.
              </SectionText>
            </Grid>
            <Grid item xs={12} sm={4}>
              <img
                src="/images/about-us-project-3.jpg"
                alt="Project 3"
                style={{ width: "100%" }}
              />
              <SectionText align="center" sx={{ mt: 2 }}>
                Project 3
              </SectionText>
              <SectionText align="center" sx={{ mb: 2 }}>
                Sed vel enim sit amet enim dictum viverra eget sed mauris. Nulla
                facilisi. Cras sed ex id tellus bibendum interdum.
              </SectionText>
            </Grid>
          </Grid>
        </Box> */}
        <Box sx={{ mb: 8 }}>
          <SectionSubheading align="center" sx={{ mb: 4 }}>
            Our Mission
          </SectionSubheading>
          <SectionText align="center" sx={{ mb: 2 }}>
            Our mission is to provide a trusted, efficient, and enjoyable
            auctioning experience for buyers and sellers around Ethiopia. We
            strive to create a platform that's accessible to everyone, and to
            maintain the highest standards of integrity, transparency, and
            customer service in everything we do.
          </SectionText>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default About;
