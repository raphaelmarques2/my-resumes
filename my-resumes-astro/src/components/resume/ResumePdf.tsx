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
import {
  formatEducation,
  type Education,
} from "../../services/types/Education";
import {
  formatExperience,
  type Experience,
} from "../../services/types/Experience";
import type { Profile } from "../../services/types/Profile";
import type { Resume } from "../../services/types/Resume";

const styles = StyleSheet.create({
  viewer: {
    width: "500px",
    height: "600px",
  },
  document: {},
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
  },
  view: {
    //fontSize: "20px",
    //fontWeight: "bold",
  },

  documentTitle: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
  },
  documentSubtitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginTop: 5,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginTop: 5,
  },
  experienceCompanyName: {
    marginBottom: 5,
  },
  text: {
    textAlign: "justify",
  },
  link: {
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
  function PdfLine() {
    return (
      <Text style={{ borderBottom: 1.5, marginTop: 10, marginBottom: 5 }} />
    );
  }

  function PdfHeader() {
    return (
      <>
        <Text style={styles.documentTitle}>{profile.name}</Text>
        <Text style={styles.documentSubtitle}>{resume.title}</Text>
        {profile.address && <Text style={styles.text}>{profile.address}</Text>}
        {profile.email && (
          <Text style={styles.text}>
            E-mail:
            <Link style={styles.link} src={`mailto:${profile.email}`}>
              {profile.email}
            </Link>
          </Text>
        )}
        {profile.linkedin && (
          <Text style={styles.text}>
            LinkedIn:
            <Link style={styles.link} src={profile.linkedin}>
              {profile.linkedin}
            </Link>
          </Text>
        )}
        <PdfLine />
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.text}>{resume.description}</Text>
      </>
    );
  }

  function PdfEducations() {
    return (
      <>
        <PdfLine />
        <Text style={styles.sectionTitle}>Educations</Text>

        {educations.map((education) => (
          <Text style={styles.text}>&#8226; {formatEducation(education)}</Text>
        ))}
      </>
    );
  }

  function PdfExperiences() {
    return (
      <>
        <PdfLine />
        <Text style={styles.sectionTitle}>Experiences</Text>
        {experiences.map((experience) => (
          <View wrap={false}>
            <Text style={styles.sectionSubtitle}>{experience.title}</Text>
            <Text style={styles.experienceCompanyName}>
              {formatExperience(experience)}
            </Text>
            <Text style={styles.text}>{experience.description}</Text>
          </View>
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
            <PdfEducations />
          </View>
          <View style={styles.view}>
            <PdfExperiences />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
