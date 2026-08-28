import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import CollectionState from './CollectionState.jsx'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    fetchCollection('teams').then(setTeams).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])
  return <CollectionState {...state}>{teams.length ? <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><span className="team-symbol">◎</span><h2>{team.name}</h2><p>{team.description}</p><footer>{team.memberIds?.length || 0} members <span>→</span></footer></article>)}</div> : <p className="empty-state">No teams created yet.</p>}</CollectionState>
}
