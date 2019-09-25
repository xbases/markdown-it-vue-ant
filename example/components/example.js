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
