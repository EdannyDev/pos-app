import { faCheck, faTimes, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  WarningIcon,
  ModalText,
  ButtonGroup,
  ConfirmButton,
  CancelButton
} from '@/styles/modal.styles'

export default function Modal({ message, onConfirm, onCancel }) {

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Confirmar Eliminación</ModalTitle>
        <WarningIcon icon={faTriangleExclamation} />
        <ModalText>{message}</ModalText>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>
            <FontAwesomeIcon icon={faCheck} />Confirmar
          </ConfirmButton>
          <CancelButton onClick={onCancel}>
            <FontAwesomeIcon icon={faTimes} />Cancelar
          </CancelButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  )
}