import { useEffect, useState } from 'react'
import { fetchCollection, getApiUrl } from '../api.js'
import CollectionState from './CollectionState.jsx'

const WORKOUTS_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : getApiUrl('workouts')

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    fetchCollection('workouts', WORKOUTS_ENDPOINT).then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])
  return <CollectionState {...state}>{workouts.length ? <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><span className={`difficulty ${workout.difficulty}`}>{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><footer>{workout.durationMinutes} min <span>{workout.activityType}</span></footer></article>)}</div> : <p className="empty-state">No workouts available.</p>}</CollectionState>
}
