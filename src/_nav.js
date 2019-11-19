export default {
  items: [
    /*{
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },*/
    {
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Pay By Card',
      url: '/add-card',
      icon: 'icon-drop',
    },
    /*{
      name: 'Pay By Card',
      url: '/execute-payment',
      icon: 'icon-pencil',
    },*/
    {
      name: 'User Preferences',
      url: '/user-preferences',
      icon: 'icon-pencil'
    }
  ],
};
