import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import NoteList from "@/component/NoteList";
import { AddNoteModal } from "@/component/AddNoteModal";
import noteService from "@/services/noteService"

export type Note = {
    $id: string;
    text: string
}

export default function NoteScreen() {
    const [notes, setNotes] = useState<Note[]>([])

    const [modalVisibility, setModalVisibility] = useState<boolean>(false)
    const [newNote, setNewNote] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)


    useEffect(() => {
        fetchNotes()
    }, [])

    const fetchNotes = async () => {
        setLoading(true)
        const response = await noteService.getNotes()
        if (response.error) {
            setError(response.error)
            Alert.alert("Error", response.error)
        } else {
            setNotes(response.data)
            setError(null)
        }
        setLoading(false)
    }
    //add New note
    async function addNote() {
        if (newNote.trim() === "") return
        const response: any = await noteService.addNote(newNote)

        if (response.error) {
            Alert.alert("Error", response.error)
        } else {
            setNotes([...notes, response.data])
        }
        setNewNote("")
        setModalVisibility(false)

    }
    return (
        <View style={styles.container}>
            <NoteList notes={notes} />
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisibility(true)}>
                <Text style={styles.addButtonText}>+ Add Note</Text>
            </TouchableOpacity>

            {/* Modal */}
            <AddNoteModal
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                newNote={newNote}
                setNewNote={setNewNote}
                addNote={addNote}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})