"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/layout/shared/logo/Logo";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Sign up successful! You can now log in.");
      router.push("/login");
    } else {
      alert(data.error || "Sign up failed.");
    }
  };

  return (
    <PageContainer title="Sign Up" description="This is the sign-up page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Logo />
              </Box>

              <Typography fontWeight="700" variant="h4" mb={1}>
                Create your account
              </Typography>

              <Typography
                variant="subtitle1"
                textAlign="center"
                color="textSecondary"
                mb={3}
              >
                Start your journey with us!
              </Typography>

              <Box>
                <Stack mb={3}>
                  <Typography variant="subtitle1" fontWeight={600} mb="5px">
                    Name
                  </Typography>
                  <CustomTextField
                    id="name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    mb="5px"
                    mt="25px"
                  >
                    Email Address
                  </Typography>
                  <CustomTextField
                    id="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    mb="5px"
                    mt="25px"
                  >
                    Password
                  </Typography>
                  <CustomTextField
                    id="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Stack>

                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSignup}
                >
                  Sign Up
                </Button>
              </Box>

              <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                <Typography color="textSecondary" variant="body2">
                  Already have an account?
                </Typography>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  <Typography color="primary" variant="body2">
                    Log in
                  </Typography>
                </Link>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
