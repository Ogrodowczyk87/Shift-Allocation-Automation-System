import { Button } from '../../../../components/ui/Button'

interface ExportCsvButtonProps {
  onClick: () => void
}

export function ExportCsvButton({ onClick }: ExportCsvButtonProps) {
  return (
    <Button variant="secondary" onClick={onClick}>
      Export CSV
    </Button>
  )
}
