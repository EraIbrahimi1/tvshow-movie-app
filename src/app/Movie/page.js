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

const initialUrl = `${apiBaseUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

const defaultMovieImg = "/default-image.jpg";

function App() {
  const [movies, setMovies] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(initialUrl);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function fetchData() {
      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => setMovies(data.results))
        .catch((error) => console.error(error));
    }
    fetchData();
  }, [fetchUrl]);

  const getMovies = (movieType) => {
    let newUrl = "";

    if (movieType === "Western") {
      newUrl = `${apiBaseUrl}/discover/movie?with_genres=37&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (movieType === "Popular") {
      newUrl = `${apiBaseUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (movieType === "Drama") {
      newUrl = `${apiBaseUrl}/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (movieType === "Kids") {
      newUrl = `${apiBaseUrl}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${apiKey}`;
    }
    if (movieType === "Thriller") {
      newUrl = `${apiBaseUrl}/discover/movie?with_genres=53&sort_by=popularity.desc&api_key=${apiKey}`;
    }

    setFetchUrl(newUrl);
  };

  const searchMovies = () => {
    const searchUrl = `${apiBaseUrl}/search/movie?query=${search}&api_key=${apiKey}`;
    setFetchUrl(searchUrl);
    setSearch("");
  };

  return (
    <>
      <Header
        getMovies={getMovies}
        search={search}
        searchMovies={searchMovies}
        setSearch={setSearch}
      />
      <MovieList movies={movies} />
    </>
  );
}

function Header({ getMovies, search, setSearch, searchMovies }) {
  let arr = ["Western", "Popular", "Kids", "Drama", "Thriller"];

  return (
    <Grid
      container
      spacing={1}
      sx={{ flexGrow: 1 }}
      alignItems="center"
      className="header"
    >
      <Grid item xs={12} sm={1}>
        <Grid item>
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <nav className="navigation">
          {arr.map((value, position) => (
            <MuiLink
              color="warning"
              variant="solid"
              key={position}
              name={value}
              onClick={(e) => getMovies(e.target.name)}
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
          color="warning"
          size="md"
          variant="soft"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endDecorator={
            <Button color="warning" size="md" onClick={searchMovies}>
              Search Movie
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
}
function MovieList({ movies }) {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpen = (movie) => {
    setOpen(true);
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  let imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
      {movies.length === 0 ? (
        <div className="no-data-msg">
          <p>No movies found!</p>
        </div>
      ) : (
        movies.map((item) => (
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
                    loading="lazy"
                    alt={item.title}
                    width={318}
                    height={475}
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography className="title" level="title-md">
                  {item.title}
                </Typography>
                <Typography className="overview" level="body-sm">
                  {item.overview
                    ? item.overview
                    : "Movie overview coming soon..."}
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
                    {item.release_date}
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
                    variant="soft"
                    color="primary"
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
                          opacity: 0.5,
                          backdropFilter: "none",
                          transition: `opacity 400ms, backdrop-filter 400ms`,
                        },
                      },
                    }}
                  >
                    <ModalDialog
                      variant="solid"
                      color="warning"
                      style={{ textAlign: "left" }}
                    >
                      <Typography
                        variant="h2"
                        style={{ color: "white", textAlign: "center" }}
                      >
                        <b>Movie Details</b>
                      </Typography>
                      {selectedMovie && (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                          >
                            <Image
                              src={
                                selectedMovie.poster_path == null
                                  ? defaultMovieImg
                                  : imgUrl + selectedMovie.poster_path
                              }
                              srcSet={
                                selectedMovie.poster_path == null
                                  ? defaultMovieImg
                                  : `${imgUrl}${selectedMovie.poster_path}?auto=format&fit=crop&w=318&dpr=2 2x`
                              }
                              width={180}
                              height={215}
                              style={{ marginRight: "20px" }}
                            />
                            <div>
                              <Typography style={{ color: "white" }}>
                                <b>Title:</b> {selectedMovie.title}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>Overview: </b>
                                {selectedMovie.overview}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>Release date: </b>
                                {selectedMovie.release_date}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>Popularity: </b>
                                {selectedMovie.popularity}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>Average vote:</b>{" "}
                                {selectedMovie.vote_average}
                              </Typography>
                              <Typography style={{ color: "white" }}>
                                <b>Vote count:</b> {selectedMovie.vote_count}
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
