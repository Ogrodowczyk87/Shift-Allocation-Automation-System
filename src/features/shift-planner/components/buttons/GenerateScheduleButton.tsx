import { Button } from '../../../../components/ui/Button'

interface GenerateScheduleButtonProps {
  onClick: () => void
}

export function GenerateScheduleButton({ onClick }: GenerateScheduleButtonProps) {
  return (
    <Button variant="primary" onClick={onClick}>
      Generate
    </Button>
  )
}
