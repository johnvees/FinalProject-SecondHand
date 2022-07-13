import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ms } from 'react-native-size-matters'
import { MyColors } from '../../utils/colors';
import Gap from '../../components/Gap'

export default function CardLink({ Icon, Title, OnPress }) {
    return (
        <TouchableOpacity style={styles.LinkComponent} onPress={OnPress}>
            <Image source={Icon} style={styles.ImageLink} />
            <Gap widht={ms(16)} />
            <Text style={styles.TextLink}>
                {Title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    LinkComponent: {
        // backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: ms(17),
        borderBottomWidth: ms(1),
        borderBottomColor: "#E5E5E5",
        marginTop: ms(16)
    },
    ImageLink: {
        width: ms(24),
        height: ms(24)
    },
    TextLink: {
        fontFamily: 'Poppins-Medium',
        color: MyColors.Neutral.NEUTRAL00,
        fontSize: ms(14)
    }
})