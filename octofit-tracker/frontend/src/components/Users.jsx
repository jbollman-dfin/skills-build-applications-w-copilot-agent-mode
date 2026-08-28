import { useEffect, useState } from 'react'
import { fetchCollection, getApiUrl } from '../api.js'
import CollectionState from './CollectionState.jsx'

const USERS_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : getApiUrl('users')

export default function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => {
    fetchCollection('users', USERS_ENDPOINT).then(setUsers).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])
  return <CollectionState {...state}>{users.length ? <div className="member-grid">{users.map((user) => <article className="member-row" key={user._id}><div className="avatar">{user.name.slice(0, 1)}</div><div><strong>{user.name}</strong><small>{user.email}</small></div></article>)}</div> : <p className="empty-state">No members found.</p>}</CollectionState>
}
