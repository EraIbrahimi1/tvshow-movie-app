"use client";

import {
  Grid,
  Input,
  Card,
  CardOverflow,
  AspectRatio,
  CardContent,
  Divider,
  Typography,
  Button,
} from "@mui/joy";

import { Link as MuiLink } from "@mui/joy";

import Link from "next/link";

import Image from "next/image";

import { useEffect, useState } from "react";

const apiKey = "a2ccd565ac3c2ace39f673e07624f62b";
const apiBaseUrl = "https://api.themoviedb.org/3";

const initialUrl = `${apiBaseUrl}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;

const defaultMovieImg = "/default-image.jpg";

function App() {
  const [tvShows, setTvShows] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(initialUrl);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function fetchData() {
      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => setTvShows(data.results))
        .catch((error) => console.error(error));
    }
    fetchData();
  }, [fetchUrl]);

  const getTvShows = (TvShowType) => {
    let newUrl = ""; // Declare a new variable to store the updated URL

    if (TvShowType === "Popular") {
      newUrl = `${apiBaseUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (TvShowType === "Drama") {
      newUrl = `${apiBaseUrl}/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (TvShowType === "Kids") {
      newUrl = `${apiBaseUrl}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (TvShowType === "Thriller") {
      newUrl = `${apiBaseUrl}/discover/movie?with_genres=53&sort_by=popularity.desc&api_key=${apiKey}`;
    }

    setFetchUrl(newUrl);
  };

  const searchTvShows = () => {
    const searchUrl = `${apiBaseUrl}/search/movie?query=${search}&api_key=${apiKey}`;
    setFetchUrl(searchUrl);
    setSearch("");
  };

  return (
    <>
      <Header
        getTvShows={getTvShows}
        search={search}
        searchTvShows={searchTvShows}
        setSearch={setSearch}
      />
      <TvShowList tvShows={tvShows} />
    </>
  );
}

function Header({ getTvShows, search, setSearch, searchTvShows }) {
  let arr = ["Popular", "Kids", "Drama", "Thriller"];

  return (
    <Grid className="header" container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={1}>
        <Grid mt="15px" ml="20px" xs={1}>
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-skip-backward-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5" />
            </svg>{" "}
          </Link>
        </Grid>
      </Grid>
      <Grid mt="24px" xs={8}>
        <nav className="navigation">
          {arr.map((value, position) => (
            <MuiLink
              color="success"
              variant="solid"
              key={position}
              name={value}
              onClick={(e) => getTvShows(e.target.name)}
            >
              {value}
            </MuiLink>
          ))}
        </nav>
      </Grid>
      <Grid xs={3}>
        <Input
          color="success"
          size="sm"
          variant="soft"
          placeholder="Search for a tv show..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          endDecorator={
            <Button color="neutral" onClick={searchTvShows}>
              Search TvShow
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
}

function TvShowList({ tvShows }) {
  let imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {tvShows.length == 0 ? (
        <div className="no-data-msg">
          <p>No tv shows found!</p>
        </div>
      ) : (
        tvShows.map((item) => (
          <Grid xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <Card
              color="warning"
              orientation="vertical"
              size="md"
              variant="soft"
            >
              <CardOverflow>
                <AspectRatio ratio="2">
                  <Image
                    src={
                      item.poster_path == null
                        ? defaultMovieImg
                        : imgUrl + item.poster_path
                    }
                    srcSet={
                      item.poster_path == null
                        ? defaultMovieImg
                        : `${imgUrl}${item.poster_path}?auto=format&fit=crop&w=318&dpr=2 2x`
                    }
                    loading="lazy"
                    alt={item.title}
                    width={318}
                    height={475}
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{item.original_name}</Typography>
                <Typography className="overview" level="body-sm">
                  {item.overview
                    ? item.overview
                    : "Tv Show overview coming soon..."}
                </Typography>
              </CardContent>
              <CardOverflow
                variant="soft"
                sx={{ bgcolor: "background.level1" }}
              >
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography
                    level="body-xs"
                    fontWeight="md"
                    textColor="text.secondary"
                  >
                    Total votes: {item.vote_count}
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    fontWeight="md"
                    textColor="text.secondary"
                  >
                    {item.first_air_date}
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography
                    level="body-xs"
                    fontWeight="md"
                    textColor="text.secondary"
                  >
                    {item.original_language.toUpperCase()}
                  </Typography>
                </CardContent>
              </CardOverflow>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default App;
