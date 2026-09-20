interface JsonLdProps {
    data: Record<string, unknown> | Record<string, unknown>[];
}

/** Server component that renders schema.org structured data as JSON-LD. */
export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            // "<" is escaped so content can never close the script tag early.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
