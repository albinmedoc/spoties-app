import base64toBlob from "../helpers/base64ToBlob";
import getSpotifyCode from "../helpers/getSpotifyCode";
import type SpotiesErrors from "./spotiesErrors";

export interface SpotiesSearchUpdateEvent extends Event {
    detail: {
        "spoties-code": string;
        "spotify-uri": string;
    }
}

export interface SpotiesSearchResClickEvent extends Event {
    detail: {
        record: string;
        artists: string;
        image: string,
    }
}

class SpotiesSearch extends HTMLElement {
    required: boolean;
    search_field: HTMLInputElement;
    search_type_field: HTMLSelectElement;
    search_results_container: HTMLDivElement;
    search_results: HTMLDivElement;
    load_more_btn: HTMLButtonElement;
    spotify_code_elem: HTMLImageElement;
    search_url_field: HTMLInputElement;
    search_url_btn: HTMLInputElement;
    search_toggle_method: HTMLAnchorElement;
    errors: SpotiesErrors;
    spotify_uri: string;
    timeout: number;
    loading: boolean;

    constructor() {
        super();

        this.required = this.hasAttribute("required");
        this.search_field = this.querySelector("#spoties-search");
        this.search_type_field = this.querySelector("select");
        this.search_results_container = this.querySelector(
            ".search__results__container"
        );
        this.search_results = this.search_results_container.querySelector("div");
        this.load_more_btn =
            this.search_results_container.querySelector("button");
        this.spotify_code_elem = this.querySelector("#spoties-spotify-code");

        this.search_url_field = this.querySelector("#spoties-search-url");
        this.search_url_btn = this.querySelector("#spoties-search-url-btn");
        this.search_toggle_method = this.querySelector(
            "#spoties-search-toggle-method"
        );

        this.errors = this.querySelector("spoties-option-errors");

        this.spotify_uri = null;

        this.timeout = null;
        this.loading = false;

        this.search_field.addEventListener("keyup", () => {
            window.clearTimeout(this.timeout);
            this.timeout = window.setTimeout(() => {
                this.onSearch();
            }, 500);
        });

        this.load_more_btn.addEventListener("click", () => this.onLoadMore());

        this.search_url_btn.addEventListener("click", () => {
            this.errors.clear();
            const url = this.search_url_field.value;
            const regex =
                /((https?:\/\/)?(www.)?open.spotify\.com\/(playlist|album|track|artist)\/[a-zA-Z0-9]{22})(\?si=[a-zA-Z0-9]*)?/g;
            if (!regex.test(url)) {
                this.errors.add("Spotify-länken verkar inte vara giltig.");
                return;
            }
            const type = url.match(/(playlist|album|track|artist)/g);
            const id = url.match(/[a-zA-Z0-9]{22}/g);
            const spotify_uri = `spotify:${type}:${id}`;
            this.setSpotifyUri(spotify_uri);
            this.search_url_field.value = "";
        });

        this.search_toggle_method.addEventListener("click", () => {
            const search_field = this.querySelector(".spoties_search_fields") as HTMLDivElement;
            const search_url_field = this.querySelector(".spoties_search_url") as HTMLDivElement;

            const show_search =
                search_field.style.display === "none";
            search_field.style.display = show_search
                ? "grid"
                : "none";
            search_url_field.style.display = show_search
                ? "none"
                : "grid";

            (this.search_toggle_method.children[0] as HTMLSpanElement).style.display = show_search ? "block" : "none";
            (this.search_toggle_method.children[1] as HTMLSpanElement).style.display = show_search ? "none" : "block";
        });
    }

    get spotify_code() {
        return base64toBlob(
            this.spotify_code_elem.src.split(",")[1],
            "images/png"
        );
    }

    validate() {
        this.errors.clear();
        let valid = true;
        if (this.required) {
            valid = this.spotify_uri !== "" && this.spotify_uri != null;
            if (!valid) {
                this.errors.add("Var vänlig och välj en låt");
            }
        }
        return valid;
    }

    clearResults() {
        while (this.search_results.firstChild) {
            this.search_results.removeChild(this.search_results.lastChild);
        }
    }

    onSearch() {
        const search = this.search_field.value;
        if (this.loading || search.trim() === "") {
            return;
        }
        this.clearResults();
        this.getResults(search).then((results) => this.showResults(results));
    }

    onLoadMore() {
        const search = this.search_field.value;
        if (this.loading || search.trim() === "") {
            return;
        }
        const offset = this.search_results.childElementCount;
        this.getResults(search, offset).then((results) =>
            this.showResults(results)
        );
    }

    getToken(): Promise<string> {
        return fetch("https://ai.soufeel.com/spotify/tokens")
            .then((response) => response.json())
            .then((response) => response.token);
    }

    getResults(search, offset = 0) {
        return this.getToken().then((token) => {
            const type = this.search_type_field.value;
            const url = `https://api.spotify.com/v1/search?q=${search}&offset=${offset}&limit=5&type=${type}&market=SE`;
            return fetch(url, {
                headers: new Headers({
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }),
            }).then((response) => response.json());
        });
    }

    showResults(results) {
        const items = results.tracks
            ? results.tracks.items
            : results.albums.items;
        items.forEach((item) => {
            const album = item.album ? item.album : item;
            const name = item.name;
            const artists = album.artists.map((a) => a.name).join(", ");
            const image = album.images[0].url;
            const uri = item.uri;

            const result = this.createSearchResult(image, name, artists);
            result.addEventListener("click", () => {
                this.setSpotifyUri(uri).finally(() => {
                    this.search_results_container.style.display = "none";
                    this.dispatchEvent(
                        new CustomEvent("resClick", {
                            detail: {
                                record: name,
                                artists,
                                image,
                            },
                        })
                    );
                    this.search_field.value = "";
                });
            });
            this.search_results.append(result);
            this.search_results_container.style.display = "block";
        });
    }

    setSpotifyUri(uri) {
        return getSpotifyCode(uri).then((src) => {
            this.spotify_code_elem.src = src;
            this.spotify_uri = uri;
            this.spotify_code_elem.style.display = "block";
            this.dispatchEvent(
                new CustomEvent("update", {
                    detail: {
                        "spoties-code": src,
                        "spotify-uri": uri,
                    },
                })
            );
        });
    }

    createSearchResult(image, name, artists) {
        const div = document.createElement("div");
        div.innerHTML = `<img src="${image}"><div><p>${name}</p><p>${artists}</p></div>`;
        return div;
    }
}

export default SpotiesSearch;