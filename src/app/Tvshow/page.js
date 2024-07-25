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
  Modal,
  ModalDialog,
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
        .then((data) => setTvShows(data.results));
    }
    fetchData();
  }, [fetchUrl]);

  const getTvShows = (TvShowType) => {
    let newUrl = "";

    if (TvShowType === "Comedy") {
      newUrl = `${apiBaseUrl}/discover/tv?with_genres=35&api_key=${apiKey}`;
    }
    if (TvShowType === "Reality") {
      newUrl = `${apiBaseUrl}/discover/tv?with_genres=10764&api_key=${apiKey}`;
    }
    if (TvShowType === "Family") {
      newUrl = `${apiBaseUrl}/discover/tv?with_genres=10751&api_key=${apiKey}`;
    }
    if (TvShowType === "Soap") {
      newUrl = `${apiBaseUrl}/discover/tv?with_genres=10766&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (TvShowType === "Talk") {
      newUrl = `${apiBaseUrl}/discover/tv?with_genres=10767&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    setFetchUrl(newUrl);
  };
  const searchTvShows = () => {
    const searchUrl = `${apiBaseUrl}/search/tv?query=${search}&api_key=${apiKey}`;
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
  let arr = ["Comedy", "Reality", "Family", "Soap", "Talk"];

  return (
    <Grid
      container
      spacing={1}
      sx={{ flexGrow: 1 }}
      alignItems="center"
      className="header"
    >
      <Grid item xs={12} sm={1}>
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-skip-backward-fill"
            viewBox="0 0 16 16"
            style={{ marginTop: "7px" }}
          >
            <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5" />
          </svg>
        </Link>
      </Grid>
      <Grid item xs={12} sm={6}>
        <nav className="navigation">
          {arr.map((value, position) => (
            <MuiLink
              color="success"
              variant="solid"
              key={position}
              name={value}
              onClick={(e) => getTvShows(e.target.name)}
              sx={{
                width: "70px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "8px",
              }}
            >
              {value}
            </MuiLink>
          ))}
        </nav>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Input
          color="success"
          size="md"
          variant="soft"
          placeholder="Search for a tv show..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endDecorator={
            <Button color="success" size="md" onClick={searchTvShows}>
              Search TvShow
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
}

function TvShowList({ tvShows }) {
  const [open, setOpen] = useState(false);
  const [selectedTvShow, setSelectedTvShow] = useState(null);

  const handleOpen = (tvShow) => {
    setOpen(true);
    setSelectedTvShow(tvShow);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTvShow(null);
  };
  let imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
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
                <AspectRatio ratio="1">
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
                    alt={item.original_name}
                    width={150}
                    height={225}
                    priority
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography className="title" level="title-md">
                  {item.original_name}
                </Typography>
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
                    Votes: {item.vote_count}
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
                <CardContent>
                  <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => handleOpen(item)}
                  >
                    Additional details
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      backdrop: {
                        sx: {
                          opacity: 0,
                          backdropFilter: "none",
                          transition: `opacity 400ms, backdrop-filter 400ms`,
                        },
                      },
                    }}
                  >
                    <ModalDialog
                      variant="solid"
                      color="success"
                      style={{ textAlign: "left" }}
                    >
                      <Typography
                        variant="h2"
                        style={{ color: "white", textAlign: "center" }}
                      >
                        <b>TV Show Details</b>
                      </Typography>
                      {selectedTvShow && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                          >
                            <Image
                              src={
                                selectedTvShow.poster_path == null
                                  ? defaultMovieImg
                                  : imgUrl + selectedTvShow.poster_path
                              }
                              srcSet={
                                selectedTvShow.poster_path == null
                                  ? defaultMovieImg
                                  : `${imgUrl}${selectedTvShow.poster_path}?auto=format&fit=crop&w=318&dpr=2 2x`
                              }
                              loading="lazy"
                              alt={selectedTvShow.original_name}
                              width={180}
                              height={215}
                              style={{ marginRight: "20px" }}
                            />
                            <div>
                              <Typography style={{ color: "white" }}>
                                <b>Title:</b> {selectedTvShow.original_name}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>Overview: </b>
                                {selectedTvShow.overview}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>First airing date: </b>
                                {selectedTvShow.first_air_date}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>Popularity: </b>
                                {selectedTvShow.popularity}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>Average vote:</b>{" "}
                                {selectedTvShow.vote_average}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>Vote count:</b> {selectedTvShow.vote_count}
                              </Typography>
                            </div>
                          </div>
                        </>
                      )}
                    </ModalDialog>
                  </Modal>
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
