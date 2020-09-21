import { orange } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: "relative",
    boxShadow: "none",
    backgroundColor: `${orange["A700"]} !important`,
    color: "#fff",
  },
  inline: {
    display: "inline"
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  productLogo: {
    display: "inline-block",
    borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1.5em"
    }
  },
  tagline: {
    display: "inline-block",
    marginLeft: 10,
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    }
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  iconButton: {
    float: "right"
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: "auto",
    color: "#fff"
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
    display: 'block',
    color: '#fff',
  },
  primaryButton: {
    margin: '12px 25px',
  },
  addButton: {
    color: '#fff !important',
    backgroundColor: '#ff6d00 !important',
    '&:hover': { backgroundColor: orange[700] },
    margin: '12px 25px',
    borderRadius: '6px',
    fontWeight: '600 !important',
    fontSize: '12px !important',
  },
  editButton: {
    color: '#fff !important',
    backgroundColor: '#ff6d00 !important',
    '&:hover': { backgroundColor: orange[700] },
    margin: '12px 25px',
    borderRadius: '6px',
    fontWeight: '600 !important',
    fontSize: '12px !important',
  },
  viewButton: {
    color: '#ff6d00 !important',
    border: '1px solid #ff9042',
    backgroundColor: '#fff',
    '&:hover': { backgroundColor: '#fff' },
    margin: '12px 25px',
    borderRadius: '6px',
    fontWeight: '600 !important',
    fontSize: '12px !important',
  },
  marginCenter: {
    display: 'block',
    textAlign: 'center',
  },
  marginHome: {
    display: 'block',
    textAlign: 'center',
    paddingTop: '20px',
  },
  iconAccountMargin: {
    marginTop: '-8px !important',
  },
  iconAccount: {
    fontSize: '2.1rem !important'
  },
  menuTopAccount: {
    marginTop: '-2px !important'
  }
})

export default styles;