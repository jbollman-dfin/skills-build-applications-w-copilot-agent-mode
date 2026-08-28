import { useEffect, useState } from 'react'
import { fetchCollection, getApiUrl } from '../api.js'
import CollectionState from './CollectionState.jsx'

const ACTIVITIES_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : getApiUrl('activities')

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    fetchCollection('activities', ACTIVITIES_ENDPOINT).then(setActivities).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])
  return <CollectionState {...state}>{activities.length ? <div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id}><span className={`activity-icon ${activity.type}`}>{activity.type.slice(0, 1).toUpperCase()}</span><div><strong>{activity.type}</strong><small>{activity.userId?.name || 'Octofit member'} · {activity.durationMinutes} min</small></div><b>+{activity.points} pts</b></article>)}</div> : <p className="empty-state">No activities logged yet.</p>}</CollectionState>
}
