import React from 'react';
import {Linking, Platform} from 'react-native';
import {Parser} from 'htmlparser2';
import {Text} from "@/components/Themed";

interface HtmlTagMap {
    [tag: string]: (children: React.ReactNode[], key: string, attribs?: { [key: string]: string }) => React.ReactNode;
}

// Function to convert HTML string to React Native components
export default function HtmlToReactNative(htmlString: string): React.ReactNode[] {
    const htmlTagMap: HtmlTagMap = {
        'p': (children, key) => (
            // Paragraph in TinyMCE, handle new lines and first tab
            <Text key={key} style={{marginBottom: 10}}>
                {Platform.OS === "ios" ? "\t".repeat(1) : "\t".repeat(5)}
                {children}
            </Text>
        ),
        'strong': (children, key) => (
            // Bold text in TinyMCE
            <Text key={key} bold>
                {children}
            </Text>
        ),
        'em': (children, key) => (
            // Italic text in TinyMCE
            <Text key={key} italic>
                {children}
            </Text>
        ),
        'a': (children, key, attributs) => {
            // Link in TinyMCE
            const href = attributs?.href;
            return (
                <Text key={key} style={{textDecorationLine: "underline"}} onPress={() => href && Linking.openURL(href)}>
                    {children}
                </Text>
            );
        },
        'mark': (children, key, attributs) => {
            // For search highlight
            return (
                <Text key={key} style={{backgroundColor: "yellow"}}>
                    {children}
                </Text>
            );
        }
    };

    const reactElements: React.ReactNode[] = [];

    const elementStack: Array<{ tag: string; children: React.ReactNode[], attributs: { [s: string]: string; } }> = [];

    const parser = new Parser(
        {
            onopentag(tag, attributs) {
                if (htmlTagMap[tag]) {
                    elementStack.push({tag, children: [], attributs});
                }
            },
            ontext(text) {
                if (elementStack.length > 0) {
                    elementStack[elementStack.length - 1].children.push(text);
                } else {
                    reactElements.push(text);
                }
            },
            onclosetag(tag) {
                const element = elementStack.pop();
                if (element && htmlTagMap[tag]) {
                    const component = htmlTagMap[tag](element.children, `key-${reactElements.length}`, element.attributs);
                    if (elementStack.length > 0) {
                        elementStack[elementStack.length - 1].children.push(component);
                    } else {
                        reactElements.push(component);
                    }
                }
            },
        },
        {decodeEntities: true}
    );

    // Parse the HTML string
    parser.write(htmlString);
    parser.end();

    return reactElements;
};
