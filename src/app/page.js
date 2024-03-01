"use client";
import Link from "next/link";
import { extendTheme } from "@mui/joy/styles";

import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Box,
  CssVarsProvider,
} from "@mui/joy";

export default function Home() {
  return (
    <CssVarsProvider>
      <div
        style={{
          textAlign: "center",
          padding: "30px",
          marginTop: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100% ",
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
            style={{
              marginRight: "20px",
              borderRadius: "25px",
              padding: "35px",
            }}
          >
            <CardContent>
              <Button
                variant="soft"
                size="lg"
                style={{ padding: "30px", borderRadius: "15px" }}
              >
                <Link
                  style={{ padding: "2rem", fontSize: "25px" }}
                  href="/Movie"
                >
                  Movie App
                </Link>
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
            style={{
              marginLeft: "20px",
              borderRadius: "25px",
              padding: "35px",
            }}
          >
            <CardContent>
              <Button
                variant="soft"
                size="lg"
                color="neutral"
                style={{ padding: "30px", borderRadius: "15px" }}
              >
                <Link
                  style={{ padding: "2rem", fontSize: "25px" }}
                  href="/Tvshow"
                >
                  TvShow App
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </CssVarsProvider>
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
          <span
            style={{
              fontSize: "2.0em",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Cinematic Choices🎬
          </span>
        </Typography>
      </Box>
    );
  }
}
