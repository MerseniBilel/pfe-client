import React from 'react'

const Modal = () => {
    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Delete User</ModalHeader>
          <ModalBody>
            Do you want to Delete this user
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block" >
              <Button>Delete</Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large">
                Accept
              </Button>
            </div>
          </ModalFooter>
        </Modal>
    )
}

export default Modal
