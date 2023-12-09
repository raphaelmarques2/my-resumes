import { useState } from "react";
import {
  PDFViewer,
  Page,
  Text,
  Link,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontSize: "10px",
  },
  document: {
    //width: "500px",
  },
  title: {
    //display: "block",
    width: "100%",
    textAlign: "center",
    //fontSize: "1.2em",
    fontWeight: "bold",
  },
  subtitle: {
    //display: "block",
    width: "100%",
    textAlign: "center",
    //fontSize: "1.1em",
    fontWeight: "bold",
  },
  profileInfo: {
    //display: "block",
  },
  section: {
    //display: "block",
  },
  link: {
    //display: "block",
    backgroundColor: "yellow",
  },
});

export function ResumePdf() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Inc</button>
      <div className="debug">
        <Document pageLayout="oneColumn" style={styles.document}>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.title}>Count: {count}</Text>
              <Text style={styles.title}>José Raphael Teixeira Marques</Text>
              <Text style={styles.subtitle}>Backend engineer</Text>
              <Text style={styles.profileInfo}>João Pessoa - Brazil</Text>
              <Text style={styles.profileInfo}>
                E-mail: jose.raphael.marques@gmail.com
              </Text>
              <Text style={styles.profileInfo}>
                LinkedIn:
                <Link
                  style={styles.link}
                  src="https://linkedin.com/in/raphaelmarques84"
                >
                  https://linkedin.com/in/raphaelmarques84
                </Link>
              </Text>
            </View>
          </Page>
        </Document>
      </div>
    </>
  );
}
