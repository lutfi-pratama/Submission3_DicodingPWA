var api_base_url = "https://api.football-data.org/v2/";
var id_liga = 2001; // LIGA CHAMPIONS
var endpoint_latest = `${api_base_url}teams/86/matches?status=FINISHED&limit=1`;
var endpoint_upcoming = `${api_base_url}teams/81/matches?status=SCHEDULED&limit=1`;
var endpoint_klasemen = `${api_base_url}competitions/${id_liga}/standings?standingType=TOTAL`;
var endpoint_jadwal_upcoming = `${api_base_url}competitions/${id_liga}/matches?status=SCHEDULED&limit=20`;
var endpoint_match = `${api_base_url}matches/`;
var endpoint_team = `${api_base_url}teams/`;


var fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '4192311e26664e49887022fbe8d3f93e'
        }
    });
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getLatestMatch() {
    if ('caches' in window) {
        caches.match(endpoint_latest).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    hasilTerakhirMatchJSON(data);
                });
            }
        });
    }

    fetchApi(endpoint_latest)
        .then(status)
        .then(json)
        .then(function (data) {
            hasilTerakhirMatchJSON(data)
        })
        .catch(error);
}

function getUpcoming() {
    if ('caches' in window) {
        caches.match(endpoint_upcoming).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    upcomingMatchJSON(data);
                });
            }
        });
    }

    fetchApi(endpoint_upcoming)
        .then(status)
        .then(json)
        .then(function (data) {
            upcomingMatchJSON(data)
        })
        .catch(error);
}

function getKlasemen() {
    if ('caches' in window) {
        caches.match(endpoint_klasemen).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    hasilKlasemenJSON(data);
                });
            }
        });
    }

    fetchApi(endpoint_klasemen)
        .then(status)
        .then(json)
        .then(function (data) {
            hasilKlasemenJSON(data)
        })
        .catch(error);
}

function getMatchLeague() {
    return new Promise(function (resolve, reject) {

        if ('caches' in window) {
            caches.match(endpoint_jadwal_upcoming).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultMatchJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_jadwal_upcoming)
            .then(status)
            .then(json)
            .then(function (data) {
                resultMatchJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailTeamById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ("caches" in window) {
            caches.match(endpoint_team + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultDetailTeamJSON(data)
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_team + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                resultDetailTeamJSON(data)
                dataTeamJSON = data;

                resolve(data);
            })
            .catch(error);
    });
}
