export default `# markdown-it-vue-ant

## markdown-it-github-toc

[toc]

## markdown-it-highlight
\`\`\`bash
for i in \`seq 100\`;do
    echo $i
done
\`\`\`

## table
| First Header  | Second Header |
| :--: | --: |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

## markdown-it-sub
H~2~0

## markdown-it-sup
29^th^

## markdown-it-mark
==mark==

## markdown-it-ins
++inserted++

## mermaid
### flowchart
\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`
### sequenceDiagram
\`\`\`mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
\`\`\`
### gantt
\`\`\`mermaid
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid
excludes weekdays 2014-01-10

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d
\`\`\`

## markdown-it-footnote
### normal footnote
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.
    Subsequent paragraphs are indented to show that they
belong to the previous footnote.

### inline footnote
Here is an inline note.^[Inlines notes are easier to write, since you don't have to pick an identifier and move down to type the note.]

## markdown-it-abbr
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
`;
