import { Button } from '../../../components/ui/Button'

interface SavePlanButtonProps {
  onClick: () => void
}

export function SavePlanButton({ onClick }: SavePlanButtonProps) {
  return (
    <Button variant="success" onClick={onClick}>
      Save plan
    </Button>
  )
}
