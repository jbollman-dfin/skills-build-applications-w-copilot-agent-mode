export default function CollectionState({ loading, error, children }) {
  if (loading) return <p className="empty-state">Loading data...</p>
  if (error) return <p className="error-state" role="alert">{error}</p>
  return children
}
