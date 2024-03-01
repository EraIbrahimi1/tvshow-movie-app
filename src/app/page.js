"use client";
import Link from "next/link";
import { extendTheme } from "@mui/joy/styles";

import { Button, Card, CardContent, Divider, Typography, Box } from "@mui/joy";

export default function Home() {
  // const theme = extendTheme({
  //   colorSchemes: {
  //     dark: {
  //       palette: {
  //         primary: {
  //           50: "#C0CCD9",
  //           100: "#A5B8CF",
  //           200: "#6A96CA",
  //           300: "#4886D0",
  //           400: "#2178DD",
  //           500: "#096BDE",
  //           600: "#1B62B5",
  //           700: "#265995",
  //           800: "#2F4968",
  //           900: "#2F3C4C",
  //         },
  //       },
  //     },
  //   },
  // });
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        marginTop: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Card
          variant="solid"
          color="primary"
          style={{ marginRight: "20px", borderRadius: "25px", padding: "35px" }}
        >
          <CardContent>
            <Button
              variant="soft"
              size="lg"
              style={{ padding: "30px", borderRadius: "15px" }}
            >
              <Link href="/Movie">Movie app</Link>
            </Button>
          </CardContent>
        </Card>

        <Divider
          orientation="vertical"
          style={{ margin: "0 20px" }}
          variant="solid"
        />

        <Card
          variant="solid"
          color="primary"
          padding="500"
          style={{ marginLeft: "20px", borderRadius: "25px", padding: "35px" }}
        >
          <CardContent>
            <Button
              variant="soft"
              size="lg"
              color="neutral"
              style={{ padding: "30px", borderRadius: "15px" }}
            >
              <Link href="/Tvshow">Tv-show app</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  function Header() {
    return (
      <Box
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginY={3}
        marginBottom={10}
      >
        <Typography
          color="neutral"
          variant="h1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <svg
            style={{ marginRight: "10px", fontSize: "2em" }}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-film"
            viewBox="0 0 16 16"
          >
            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
          </svg>
          <span style={{ fontSize: "2.0em", fontWeight: "bold" }}>
            Cinematic Choices
          </span>
        </Typography>
      </Box>
    );
  }
}
