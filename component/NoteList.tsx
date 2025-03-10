import { FlatList, View } from "react-native"
import NoteItem from "./NoteItem"
import { Note } from "@/app/notes"
export default function NoteList({ notes }: { notes: Note[] }) {
    return (
        <View>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <NoteItem note={item} />
                )}
            />

        </View>
    )
}
