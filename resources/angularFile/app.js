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
            templateUrl: "../resources/templates/home.html",
            controller:"homeCtrl",
            resolve:{
                    Giornaliera: function ($http,ipAddress){
                        var data = new Date();

                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/playlist_giornaliera/'+ data,
                            withCredentials: true
                            }).then(function (response){
                                for(playlist in response.data){
                                    response.data[playlist].immagine = ipAddress+response.data[playlist].immagine;
                                }
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
        .when("/amiciOn",{
            templateUrl:"../resources/templates/amiciOn.html",
            controller: "amiciOnCtrl"
        })
        .when("/utente/:username",{
            templateUrl:"../resources/templates/utente.html",
            controller:"utenteCtrl",
            resolve:  {
                User: function($http, $route,ipAddress){

                    return $http({
                        method: "GET",
                        url:ipAddress+'/require/utente/' + $route.current.params.username,
                        withCredentials: true
                        }).then(function (response){
                            response.data.immagine = ipAddress+response.data.immagine;
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                },
                Ascoltati:function($http, $route,ipAddress){

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/ascoltati_recente_utente/'+ $route.current.params.username,
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                },
                Seguiti:function($http, $route,ipAddress){

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/artisti_seguiti/'+ $route.current.params.username,
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                }


            }

        })
        .when("/libreria/playlist",{
            templateUrl:"../resources/templates/playlist.html",
            controller:"playlistCtrl",
            resolve: {
                PersonalPlaylist: function ($http,ipAddress) {

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/le_tue_playlist',
                        withCredentials: true
                        }).then(function (response){
                            for(playlist in response.data){
                                response.data[playlist].immagine = ipAddress + response.data[playlist].immagine;
                            }
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                }
            }
        })
        .when("/libreria/leTueCanzoni", {
            templateUrl: "../resources/templates/leTueCanzoni.html",
            controller: "tueCanzoniCtrl",
            resolve: {
                Saved: function ($http,ipAddress) {

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/canzoni_salvate',
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                }
            }
        })
        .when("/libreria/ascoltatiRecente", {
            templateUrl: "../resources/templates/ascoltatiRecente.html",
            controller: "recentiCtrl",
            resolve: {
                Recenti: function ($http,ipAddress) {

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/ascoltate_recente',
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                }
            }
        })
        .when("/libreria/playlist/:codice",{
            templateUrl: "../resources/templates/playlist_Ut.html",
            controller:"playlistUtCtrl",
            resolve:{
                Playlist: function ($http, $route,ipAddress) {

                    return $http({
                        method: "GET",
                        url: ipAddress+"/require/get_brani_playlist/" + $route.current.params.codice,
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                },
                NomePlaylist: function ($http, $route,ipAddress) {

                    return $http({
                        method: "GET",
                        url: ipAddress+"/require/nome_playlist/"+ $route.current.params.codice,
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                }
            }
        })
        .when("/playlist_def/:codice",{
            templateUrl: "../resources/templates/playlist_Def.html",
            controller:"playlistDefCtrl",
            resolve:{
                PlaylistDef: function ($http, $route,ipAddress) {

                    return $http({
                        method: "GET",
                        url: ipAddress+"/require/get_brani_playlist/" + $route.current.params.codice,
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                }
            }
        })

        .when("/artista/:id",{
            templateUrl: "../resources/templates/artista.html",
            controller: "artistaCtrl",
            resolve:  {
                Artista: function($http, $route,ipAddress){

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/artista/'+ $route.current.params.id,
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                },
                SongArtista:function($http, $route,ipAddress){

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/canzoni_ascoltate/'+ $route.current.params.id,
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                },
                AlbumArtista:function($http, $route,ipAddress){

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/get_altro_artista/'+ $route.current.params.id,
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                }
            }
        })

        .when("/player",{
            templateUrl:"../resources/templates/player.html",
            controller:"playerCtrl"
        })


        .when("/preferiti",{
            templateUrl: "../resources/templates/artisti.html",
            controller: "artistiPrefCtrl",
            resolve: {
                ArtistiPreferiti: function ($http,ipAddress) {

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/artisti_seguiti',
                        withCredentials: true
                        }).then(function (response){
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                }
            }

        })
        .when("/amici",{
            templateUrl: "../resources/templates/amici.html",
            controller: "amiciCtrl",
            resolve: {
                Amici: function ($http,ipAddress) {
                    
                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/get_amici',
                        withCredentials: true
                        }).then(function (response){
                            for(amici in response.data){
                                response.data[amici].immagine = ipAddress+response.data[amici].immagine;
                            }
                            return response.data;
                        },function myError(response){
                            return[];
                        });

                }
            }

        })

        .when("/sceltiPerTe",{
                templateUrl:"../resources/templates/sceltiPerTe.html",
                controller: "sceltiCtrl",
                resolve: {
                    Scelti: function ($http,ipAddress) {

                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/',
                            withCredentials: true
                            }).then(function (response){
                                return response.data;
                            },function myError(response){
                                return[];
                            });

                    }
                }

        })
        .when("/piuAscoltati",{
                templateUrl:"../resources/templates/piuAscoltati.html",
                controller:"piuAscoltatiCtrl",
                resolve: {
                    PiuAscoltate: function ($http,ipAddress) {

                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/piu_ascoltate',
                            withCredentials: true
                            }).then(function (response){
                                return response.data;
                            },function myError(response){
                                return[];
                            });

                    }
                }

        })
        .when("/mood",{
                templateUrl:"../resources/templates/mood.html",
                controller:"moodCtrl",
                resolve: {
                    Mood: function ($http,ipAddress) {

                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/playlist_mood',
                            withCredentials: true
                            }).then(function (response){
                                for(playlist in response.data){
                                    response.data[playlist].immagine = ipAddress+response.data[playlist].immagine;
                                }
                                return response.data;
                            },function myError(response){
                                return[];
                            });

                    },
                    Genere: function ($http,ipAddress) {

                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/playlist_genere',
                            withCredentials: true
                            }).then(function (response){
                                for(playlist in response.data){
                                    response.data[playlist].immagine = ipAddress+response.data[playlist].immagine;
                                }
                                return response.data;
                            },function myError(response){
                                return[];
                            });

                    }
                }

        })

        .when("/album/:codAlbum",{
                templateUrl: "../resources/templates/album.html",
                controller: "albumCtrl",
                resolve:  {
                    Album: function($http, $route,ipAddress){

                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/get_album/'+ $route.current.params.codAlbum,
                            withCredentials: true
                            }).then(function (response){
                                return response.data;
                            },function myError(response){
                                return[];
                            });

                    },
                    BraniAlbum: function($http, $route,ipAddress){

                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/get_brani_album/' + $route.current.params.codAlbum,
                            withCredentials: true
                            }).then(function (response){
                                return response.data;
                            },function myError(response){
                                return[];
                            });

                    },
                    ListaPlaylist: function ($http,ipAddress) {

                        return $http({
                            method: "GET",
                            url: ipAddress+'/require/le_tue_playlist',
                            withCredentials: true
                            }).then(function (response){
                                for(playlist in response.data){
                                    response.data[playlist].immagine = ipAddress+response.data[playlist].immagine;
                                }
                                return response.data;
                            },function myError(response){
                                return[];
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
            template: "../resources/templates/home.html",
            controller:"homeCtrl",
            resolve:{
                Giornaliera: function ($http,ipAddress){
                    var data = new Date();

                    return $http({
                        method: "GET",
                        url: ipAddress+'/require/playlist_giornaliera/'+ data,
                        withCredentials: true
                        }).then(function (response){
                            for(playlist in response.data){
                                response.data[playlist].immagine = ipAddress+response.data[playlist].immagine;
                            }
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



