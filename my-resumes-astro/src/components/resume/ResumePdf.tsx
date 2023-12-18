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
import type { Education } from "../../services/types/Education";
import type { Experience } from "../../services/types/Experience";
import type { Profile } from "../../services/types/Profile";
import type { Resume } from "../../services/types/Resume";

const styles = StyleSheet.create({
  viewer: {
    width: "400px",
    height: "600px",
  },
  page: {
    fontSize: "12px",
    padding: "20px",
  },
  document: {
    //width: "500px",
  },
  view: {
    //display: "block",
    //fontSize: "20px",
    //fontWeight: "bold",
  },

  documentTitle: {
    //display: "block",
    width: "100%",
    textAlign: "center",
    //fontSize: "1.2em",
    fontWeight: "bold",
  },
  documentSubtitle: {
    //display: "block",
    width: "100%",
    textAlign: "center",
    //fontSize: "1.1em",
    fontWeight: "bold",
  },
  sectionTitle: {
    //display: "block",
    fontSize: "20px",
    fontWeight: "bold",
  },
  sectionSubtitle: {
    //display: "block",
    fontSize: "20px",
    fontWeight: "bold",
  },
  line: {
    //display: "block",
  },
  link: {
    //display: "block",
    backgroundColor: "yellow",
  },
});

interface Props {
  resume: Resume;
  profile: Profile;
  educations: Education[];
  experiences: Experience[];
}

export function ResumePdf({ resume, profile, educations, experiences }: Props) {
  const [count, setCount] = useState(0);

  function PdfHeader() {
    return (
      <>
        <Text style={styles.documentTitle}>José Raphael Teixeira Marques</Text>
        <Text style={styles.documentSubtitle}>Backend engineer</Text>
        <Text style={styles.line}>João Pessoa - Brazil</Text>
        <Text style={styles.line}>
          E-mail:
          <Link style={styles.link} src="mailto:jose.raphael.marques@gmail.com">
            jose.raphael.marques@gmail.com
          </Link>
        </Text>
        <Text style={styles.line}>
          LinkedIn:
          <Link
            style={styles.link}
            src="https://linkedin.com/in/raphaelmarques84"
          >
            https://linkedin.com/in/raphaelmarques84
          </Link>
        </Text>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.line}>description</Text>
      </>
    );
  }

  function PdfEduations() {
    return (
      <>
        <Text style={styles.sectionTitle}>Educations</Text>
        {educations.map((education) => (
          <>
            <Text style={styles.line}>{education.title}</Text>
            <Text style={styles.line}>{education.institution}</Text>
          </>
        ))}
      </>
    );
  }

  function PdfExperiences() {
    return (
      <>
        <Text style={styles.sectionTitle}>Experiences</Text>
        {experiences.map((experience) => (
          <>
            <Text style={styles.sectionSubtitle}>{experience.title}</Text>
            <Text style={styles.line}>{experience.company}</Text>
            <Text style={styles.line}>{experience.description}</Text>
          </>
        ))}
      </>
    );
  }

  return (
    <PDFViewer style={styles.viewer}>
      <Document pageLayout="oneColumn" style={styles.document}>
        <Page size="A4" style={styles.page}>
          <View style={styles.view}>
            <PdfHeader />
          </View>
          <View style={styles.view}>
            <PdfEduations />
          </View>
          <View style={styles.view}>
            <PdfExperiences />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
