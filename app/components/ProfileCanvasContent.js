import React from 'react'
import { StyleSheet, FlatList, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import PropTypes from 'prop-types'
import { ImageLink } from '../helpers/helpers'

const ProfileCanvasContent = (props) => {
  const { type, data, navigation } = props

  switch (type) {
    case 'sport.profile': {
      return SportProfile(data, navigation)
    }
    case 'sport.league': {
      return SportLeague(data.leagues, navigation)
    }
    case 'sport.athlete': {
      return SportAthlete(data.athletes, navigation)
    }
    case 'leagues.teams': {
      return LeaguesTeams(data.teams, navigation)
    }
    case 'teams.players': {
      return TeamPlayers(data.players, navigation)
    }
    case 'athlete.sportsAndTeams': {
      return AthleteSportsAndTeams(data, navigation)
    }
    default: {
      return null
    }
  }
}

const AthleteSportsAndTeams = (data, navigation) => {
  const filterData = []

  data.sports.forEach((sport) => {
    filterData.push({
      activityId: sport.activityId,
      activity: sport.activity,
      pictogram: sport.pictogram,
      teams: data.teams.filter(team => team.activityId === sport.activityId),
    })
  })

  return (
    <FlatList
      style={styles.flatListStyle}
      data={filterData}
      keyExtractor={(x, i) => i.toString()}
      renderItem={item => (
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: ImageLink(`sportblackicons/${item.item.pictogram}`) }} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
          <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity onPress={() => navigation.navigate('SportsProfile', { id: item.item.activityId })}>
              <Text style={{ fontWeight: '600' }}>{item.item.activity}</Text>
            </TouchableOpacity>
            <FlatList
              data={item.item.teams}
              keyExtractor={(x, i) => i.toString()}
              renderItem={subItem => (
                <TouchableOpacity onPress={() => navigation.navigate('TeamsProfile', { id: subItem.item.teamid })}>
                  <Text style={{ padding: 5, paddingLeft: 10 }}>
                    {`${subItem.item.locale} ${subItem.item.teamname}`}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
    />
  )
}

const TeamPlayers = (data, navigation) => (
  <FlatList
    style={styles.flatListStyle}
    data={data}
    keyExtractor={(x, i) => i.toString()}
    renderItem={item => (
      <TouchableOpacity onPress={() => navigation.navigate('AthletesProfile', { id: item.item.id })}>
        <Text>{`${item.item.firstName} ${item.item.lastName}`}</Text>
      </TouchableOpacity>
    )}
  />
)

const LeaguesTeams = (data, navigation) => (
  <FlatList
    style={styles.flatListStyle}
    data={data}
    keyExtractor={(x, i) => i.toString()}
    renderItem={item => (
      <View>
        <Text>{item.item.name}</Text>
        <FlatList
          data={item.item.partitions}
          keyExtractor={(x, i) => i.toString()}
          renderItem={subItem => (
            <View>
              <Text style={{ paddingLeft: 5 }}>{subItem.item.name}</Text>
              <FlatList
                data={subItem.item.teams}
                keyExtractor={(x, i) => i.toString()}
                renderItem={childItem => (
                  <TouchableOpacity onPress={() => navigation.navigate('TeamsProfile', { id: childItem.item.id })}>
                    <Text style={{ paddingLeft: 10 }}>
                      {`${childItem.item.locale} ${childItem.item.name}`}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
      </View>
    )}
  />
)

const SportAthlete = (data, navigation) => (
  <FlatList
    style={styles.flatListStyle}
    data={data}
    keyExtractor={(x, i) => i.toString()}
    renderItem={item => (
      <TouchableOpacity onPress={() => navigation.navigate('AthletesProfile', { id: item.item.participantId })}>
        <Text style={styles.listItemTitle}>{`${item.item.athletefirstname} ${item.item.athletelastname}`}</Text>
      </TouchableOpacity>
    )}
  />
)

const SportLeague = (data, navigation) => {
  const title = (item) => {
    let t = item.entityName

    if (item.abbreviation) t = `${t}(${item.abbreviation})`
    if (item.countryCodeString) t = `${t} - ${item.countryCodeString}`

    return t
  }

  return (
    <FlatList
      style={styles.flatListStyle}
      data={data}
      keyExtractor={(x, i) => i.toString()}
      renderItem={item => (
        <TouchableOpacity onPress={() => navigation.navigate('LeaguesProfile', { id: item.item.entityId })}>
          <Text style={styles.listItemTitle}>{title(item.item)}</Text>
        </TouchableOpacity>
      )}
    />
  )
}
const SportProfile = data => (
  <ScrollView style={styles.flatListStyle}>
    <Text style={styles.bodyText}>
      {data.summary}
    </Text>
  </ScrollView>
)

ProfileCanvasContent.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  flatListStyle: {
    height: '85%',
  },
  listItemTitle: {
    fontSize: 15,
    margin: 0,
    padding: 0,
  },
  bodyText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
})
export default ProfileCanvasContent
