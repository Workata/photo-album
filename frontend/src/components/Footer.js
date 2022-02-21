export default function Footer() {
  return (
      <footer
        style={{
          height: "30px",

          // https://stackoverflow.com/questions/55541850/how-to-make-footer-stay-at-bottom-of-the-page-with-flex-box
          // ! keep footer at the bottom
          marginTop: "auto",

          width: "100%",
          backgroundColor: "#fafffd",
          color: "black",
          textAlign: "center",
          boxShadow: "0 -5px grey",
        }}
      >
        © 2022 www.tomtol.pl Some Rights Reserved
      </footer>
  );
}