import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { EducationData } from "entities/Resume";
import { Section } from "../layout/Section";


interface EducationInfoProps {
    data: EducationData[];
}

const styles = StyleSheet.create({
    educationInfo: {
        flexDirection: 'column',
        gap: 24,
    },
    educationItem: {
        flexDirection: 'row'
    },
    leftColumn: {
        width: '25%',
        color: '#595959',
        textAlign: 'left'
    },
    grade: {
        fontSize: 14
    },
    period: {
        fontSize: 10
    },
    mainColumn: {
        flex: 1,
        flexDirection: 'column'
    },
    orgName: {
        fontSize: 14,
        fontWeight: 700,
    },
});

export const EducationInfo = memo((props: EducationInfoProps) => {
    const { data } = props;
    const { t } = useTranslation('preview', {keyPrefix: 'educationInfo'});

    const renderEduItem = (item: EducationData) => {
        return (
            <View style={styles.educationItem}>
                <View style={styles.leftColumn}>
                    <Text style={styles.grade}>
                        { t(item.grade) }
                    </Text>
                    <Text style={styles.period}>
                        { `${item.dateFrom.slice(0, 4)} — ${ item.dateTo?.slice(0, 4) || t('dateTo', {context: 'empty'})}` }
                    </Text>
                </View>
                <View style={styles.mainColumn}>
                    <Text style={styles.orgName}>{ `${item.org}, ${item.city}` }</Text>
                    <Text>{ `${item.faculty}, ${item.program}` }</Text>
                </View>
            </View>
        )
    };

    return (
        <Section title={t('title')}>
            <View style={styles.educationInfo}>
                {
                    data.map(item => renderEduItem(item))
                }
            </View>
        </Section>
    )
});