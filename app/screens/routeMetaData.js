import env from '../config/env'

const getURL = api => env.apiURL + api

const getRouteMetaData = route => routeData.find(item => item.route === route)

const routeData = [
  {
    route: 'Home',
    api: getURL('get_populateVideos.php'),
    analytics: 'home',
  },
  {
    route: 'Sports',
    api: getURL('get_populateSports.php'),
    analytics: 'sports',
    formatData: item => (
      {
        id: item.sportId,
        image: `activity/${item.pictogram}`,
        title: item.activity,
      }
    ),
    navigate: {
      route: 'SportsProfile',
    },
  },
  {
    route: 'SportsProfile',
    analytics: 'sports',
    profile: {
      api: getURL('get_populateSportProfileInfo.php'),
      payload: id => (
        { sportId: id }
      ),
    },
    videos: {
      api: getURL('get_populateSportProfileVideos.php'),
      payload: id => (
        { sportId: id }
      ),
    },
  },
  {
    route: 'Leagues',
    api: getURL('get_populateLeagues.php'),
    analytics: 'leagues',
    formatData: item => (
      {
        id: item.entityId,
        image: `entity/${item.leagueImage}`,
        title: item.entityName,
      }
    ),
    navigate: {
      route: 'LeaguesProfile',
    },
  },
  {
    route: 'LeaguesProfile',
    analytics: 'leagues',
    profile: {
      api: getURL('get_populateLeagueProfileInfo.php'),
      payload: id => (
        { entityId: id }
      ),
    },
    videos: {
      api: getURL('get_populateLeagueProfileVideos.php'),
      payload: id => (
        { entityId: id }
      ),
    },
  },
  {
    route: 'Teams',
    api: getURL('get_populateTeams.php'),
    analytics: 'teams',
    formatData: item => (
      {
        id: item.teamId,
        image: `team/${item.teamimage}`,
        title: `${item.teamlocale} ${item.teamname}`,
      }
    ),
    navigate: {
      route: 'TeamsProfile',
    },
  },
  {
    route: 'TeamsProfile',
    analytics: 'teams',
    profile: {
      api: getURL('get_populateTeamProfileInfo.php'),
      payload: id => (
        { teamId: id }
      ),
    },
    videos: {
      api: getURL('get_populateTeamProfileVideos.php'),
      payload: id => (
        { teamId: id }
      ),
    },
  },
  {
    route: 'Athletes',
    api: getURL('get_athleteHeadshot.php'),
    analytics: 'athletes',
    formatData: item => (
      {
        id: item.id,
        image: `participant/${encodeURI(item.imagePath)}`,
        title: `${item.firstName} ${item.lastName}`,
      }
    ),
    navigate: {
      route: 'AthletesProfile',
    },
  },
  {
    route: 'AthletesProfile',
    analytics: 'athletes',
    profile: {
      api: getURL('get_profile.php'),
      payload: id => (
        { id }
      ),
    },
    videos: {
      api: getURL('get_populateAthleteVideos.php'),
      payload: id => (
        { id }
      ),
    },
  },
]

export default getRouteMetaData
