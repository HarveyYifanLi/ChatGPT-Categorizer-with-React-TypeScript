import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App"
import { v4 as uuidV4 } from "uuid"
import { Configuration, OpenAIApi } from "openai";


type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

type OptionObjectType = {
  model: string,
  temperature: number,
  max_tokens: number,
  top_p: number,
  frequency_penalty: number,
  presence_penalty: number,
  prompt: string,
}

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const configuration = new Configuration({
    apiKey: "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",// This is a fake key, rememeber to insert your own OpenAI API key here
  });
  const openai = new OpenAIApi(configuration);

  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })

    navigate("..")
  }

  async function handleChatGPTQuery(e: FormEvent) {
    e.preventDefault()

    const query = titleRef.current!.value

    const optionObject: OptionObjectType = {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0, 
      prompt: query,
    };

    const response = await openai.createCompletion(optionObject)

    markdownRef.current!.value = response.data.choices[0].text as string
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
          <Stack gap={2}>
            <Form.Group controlId="title">
                <Form.Label className="main-page-texts">Title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={title} />
              </Form.Group>
              <Button type="submit" variant="warning" onClick={handleChatGPTQuery}>
                Ask ChatGPT
              </Button>
          </Stack>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label className="main-page-texts">Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])
                }}
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label className="main-page-texts">ChatGPT Replies</Form.Label>
          <Form.Control
            defaultValue={markdown}
            required
            as="textarea"
            ref={markdownRef}
            rows={15}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
