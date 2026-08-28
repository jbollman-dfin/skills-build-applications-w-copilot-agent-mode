import { useEffect, useState } from 'react'
import { fetchCollection, getApiUrl } from '../api.js'
import CollectionState from './CollectionState.jsx'

const LEADERBOARD_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : getApiUrl('leaderboard')

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    fetchCollection('leaderboard', LEADERBOARD_ENDPOINT).then(setLeaders).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])
  return <CollectionState {...state}>{leaders.length ? <div className="leader-list">{leaders.map((entry, index) => <article className="leader-row" key={entry._id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div className="avatar">{entry.userId?.name?.slice(0, 1) || '?'}</div><strong>{entry.userId?.name || 'Unknown member'}</strong><b>{entry.points} <small>points</small></b></article>)}</div> : <p className="empty-state">No leaderboard entries yet.</p>}</CollectionState>
}
