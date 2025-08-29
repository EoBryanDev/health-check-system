interface IDashboardFetchError {
  error?: {
    message: string
  } 
}
const DashboardFetchError = ({error}: IDashboardFetchError) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="text-red-500 mb-2">Erro ao carregar dados do dashboard</div>
        <div className="text-sm text-muted-foreground">
          {error?.message || 'Tente novamente mais tarde'}
        </div>
      </div>
    </div>
  )
}

export { DashboardFetchError}