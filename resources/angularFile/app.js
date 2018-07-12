angular.module('PlayAround',['ngRoute','ngStorage','angucomplete-alt','ui.carousel','PlayAroundConf'])

.run(['Carousel', (Carousel) => {
    Carousel.setOptions({
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        cssEase: 'ease',
        dots: false,

        easing: 'linear',
        fade: false,
        infinite: true,
        initialSlide: 0,

        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
    });
}])
/* Routing  */
.config(function($routeProvider,ipAddress,$httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.withCredentials = true;
    
    $routeProvider
        .when("/", {
            templateUrl: "/resources/templates/home.html",
            controller:"homeCtrl",
            resolve:{
                    Giornaliera: function ($http,ipAddress){
                        var data = new Date();
                        return $http.get(ipAddress+'/require/playlist_giornaliera/'+ data)
                            .then(function(response){
                                return response.data;
                            })
                    },
                    Recently: function ($http,ipAddress) {
                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/ascoltati_recente',
                            withCredentials: true
                            }).then(function (response){
                                return response.data;
                            },function myError(response){
                                return[];
                            });
                    },
                    AmiciSong: function ($http,ipAddress) {  
                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/ascoltano_amici',
                            withCredentials: true
                            }).then(function (response){
                                return response.data;
                            },function myError(response){
                                return[];
                            });
                    }
            }
        })
        .when("/amiciOn",{
            templateUrl:"/resources/templates/amiciOn.html",
            controller: "amiciOnCtrl"
        })
        .when("/utente/:username",{
            templateUrl:"/resources/templates/utente.html",
            controller:"utenteCtrl",
            resolve:  {
                User: function($http, $route){
                    return $http.get(ipAddress+'require/utente/' + $route.current.params.username)
                        .then(function(response){
                            return response.data;
                        })
                },
                Ascoltati:function($http, $route){
                    return $http.get(ipAddress+'require/ascoltati_recente_utente/'+ $route.current.params.username)
                        .then(function(response){
                            return response.data;
                        })
                },
                Seguiti:function($http, $route){
                    return $http.get(ipAddress+'require/artisti_seguiti/'+ $route.current.params.username)
                        .then(function(response){
                            return response.data;
                        })
                }


            }

        })
        .when("/libreria/playlist",{
            templateUrl:"/resources/templates/playlist.html",
            controller:"playlistCtrl",
            resolve: {
                PersonalPlaylist: function ($http) {
                    return $http.get(ipAddress+'/require/le_tue_playlist')
                        .then(function (response) {
                            return response.data;
                        });
                }
            }
        })
        .when("/libreria/leTueCanzoni", {
            templateUrl: "/resources/templates/leTueCanzoni.html",
            controller: "tueCanzoniCtrl",
            resolve: {
                Saved: function ($http) {
                    return $http.get(ipAddress+'/require/canzoni_salvate')
                        .then(function (response) {
                            return response.data;
                        });
                }
            }
        })
        .when("/libreria/ascoltatiRecente", {
            templateUrl: "/resources/templates/ascoltatiRecente.html",
            controller: "recentiCtrl",
            resolve: {
                Recenti: function ($http) {
                    return $http.get(ipAddress+'/require/ascoltate_recente')
                        .then(function (response) {
                            return response.data;
                        });
                }
            }
        })
        .when("/libreria/playlist/:codice",{
            templateUrl: "/resources/templates/playlist_Ut.html",
            controller:"playlistUtCtrl",
            resolve:{
                Playlist: function ($http, $route) {
                    return $http.get(ipAddress+"/require/get_brani_playlist/" + $route.current.params.codice)
                        .then(function (response) {
                            //return JSON.stringify({nome:$scope.nomePlaylist,response:response.data});
                            return response.data;
                        })
                },
                NomePlaylist: function ($http, $route) {
                    return $http.get(ipAddress+"/require/nome_playlist/"+ $route.current.params.codice)
                        .then(function(response){
                            return {nome:response.data.nome,codice:$route.current.params.codice};
                        });
                }
            }
        })
        .when("/playlist_def/:codice",{
            templateUrl: "/resources/templates/playlist_Def.html",
            controller:"playlistDefCtrl",
            resolve:{
                Playlist: function ($http, $route) {
                    return $http.get(ipAddress+"/require/get_brani_playlist/" + $route.current.params.codice)
                        .then(function (response) {
                            //return JSON.stringify({nome:$scope.nomePlaylist,response:response.data});
                            return response.data;
                        })

                }
            }
        })

        .when("/artista/:id",{
            templateUrl: "/resources/templates/artista.html",
            controller: "artistaCtrl",
            resolve:  {
                Artista: function($http, $route){
                    return $http.get(ipAddress+'/require/artista/'+ $route.current.params.id)
                        .then(function(response){
                            return response.data;
                        })
                },
                SongArtista:function($http, $route){
                    return $http.get(ipAddress+'/require/canzoni_ascoltate/'+ $route.current.params.id)
                        .then(function(response){
                            return response.data;
                        })
                },
                AlbumArtista:function($http, $route){
                    return $http.get(ipAddress+'/require/get_altro_artista/'+ $route.current.params.id)
                        .then(function(response){
                            return response.data;
                        })
                }
                }
        })

        .when("/player",{
                templateUrl:"/resources/templates/player.html",
            controller:"playerCtrl"
        })


        .when("/preferiti",{
            templateUrl: "/resources/templates/artisti.html",
            controller: "artistiPrefCtrl",
            resolve: {
                ArtistiPreferiti: function ($http) {
                    return $http.get(ipAddress+'/require/artisti_seguiti')
                        .then(function (response) {
                            return response.data;
                        });
                }
            }

        })
        .when("/amici",{
            templateUrl: "/resources/templates/amici.html",
            controller: "amiciCtrl",
            resolve: {
                Amici: function ($http) {
                    return $http.get(ipAddress+'/require/get_amici')
                        .then(function (response) {
                            return response.data;
                        });
                }
            }

        })

        .when("/sceltiPerTe",{
                templateUrl:"/resources/templates/sceltiPerTe.html",
                controller: "sceltiCtrl",
                resolve: {
                    Scelti: function ($http) {
                        return $http.get(ipAddress+'/require/')
                            .then(function (response) {
                                return response.data;
                            });
                    }
                }

        })
        .when("/piuAscoltati",{
                templateUrl:"/resources/templates/piuAscoltati.html",
                controller:"piuAscoltatiCtrl",
                resolve: {
                    PiuAscoltate: function ($http) {
                        return $http.get(ipAddress+'/require/piu_ascoltate')
                            .then(function (response) {
                                return response.data;
                            });
                    }
                }

        })
        .when("/mood",{
                templateUrl:"/resources/templates/mood.html",
                controller:"moodCtrl",
                resolve: {
                    Mood: function ($http) {
                        return $http.get(ipAddress+'/require/playlist_mood')
                            .then(function (response) {
                                return response.data;
                            });
                    },
                    Genere: function ($http) {
                        return $http.get(ipAddress+'/require/playlist_genere')
                            .then(function (response) {
                                return response.data;
                            });
                    }
                }

        })

        .when("/album/:codAlbum",{
                templateUrl: "/resources/templates/album.html",
                controller: "albumCtrl",
                resolve:  {
                    Album: function($http, $route){
                        return $http.get(ipAddress+'/require/get_album/'+ $route.current.params.codAlbum)
                            .then(function(response){
                                return response.data;
                            })
                    },
                    BraniAlbum: function($http, $route){
                        return $http.get(ipAddress+'/require/get_brani_album/' + $route.current.params.codAlbum)
                            .then(function(response){
                                return response.data;
                            })
                    },
                    ListaPlaylist: function ($http) {
                        return $http.get(ipAddress+'/require/le_tue_playlist')
                            .then(function (response) {
                                return response.data;
                            });
                    }

                   /*AltriAlbum: function($http){
                        return $http.get('/get_altro_artista/')
                            .then(function(response){
                                return response.data;
                            })
                    }*/
                }

        })
        .otherwise({
            template: "/resources/templates/home.html",
            controller:"homeCtrl",
            resolve:{
                Giornaliera: function ($http,ipAddress) {
                    var data =new Date();
                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/playlist_giornaliera/'+ data,
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });
                    },
                    Recently: function ($http,ipAddress) {
                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/ascoltati_recente',
                            withCredentials: true
                            }).then(function (response){
                                return response.data;
                            },function myError(response){
                                return[];
                            });
                    },
                    AmiciSong: function ($http,ipAddress) {  
                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/ascoltano_amici',
                            withCredentials: true
                            }).then(function (response){
                                return response.data;
                            },function myError(response){
                                return[];
                            });
                    }
            }
        })
})



