const toast = useToast()

export const useNotification = () => {
  return {
    add: (description: string, title = 'Success') => {
      let config = {}

      switch (title) {
        case 'Error': {
          config = {
            title,
            description,
            timeout: 5000,
            color: 'red',
            icon: 'i-heroicons-exclamation-circle'
          }
          break;
        }
        default: {
          config = {
            title,
            description,
            timeout: 5000,
            color: 'green',
            icon: 'i-heroicons-check-circle'
          }
        }
      }

      toast.add(config)
    },

    remove: (id: string) => toast.remove(id)
  }
}