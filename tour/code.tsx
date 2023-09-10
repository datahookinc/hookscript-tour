import React, { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import { useCompiler } from './hooks/useCompiler';

const StyledCode = styled.section`
    width: 50%;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: auto;

    @media only screen and (max-width: 600px) {
        width: 100%;
        height: 1000px;
        
        .charged-resize-bar {
            display: none;
        }
    }

    .charged-resize-bar {
        padding-left: 6px;
        padding-right: 6px;
        position: absolute;
        left: -6px;
        height: 100%;
        cursor: col-resize;
    }

    .charged-resize-bar::before {
        content: "";
        height: 100%;
        width: 4px;
        background-color: var(--purple-gray);
        display: block;
    }

    .code-container {
        display: flex;
        overflow: hidden;
        /* background-color: #253443; */
        background-color: var(--dark-purple);
        width: 100%;
        overflow: hidden;
        flex: 1 1 0;
        min-height: 200px;

        .text-area {
            resize: none;
            outline: none;
            tab-size: 4;
            flex-grow: 1;
            border: none;
            background-color: var(--dark-purple);
            padding: 0;
            font-family: monospace;
            font-size: 1.1em;
            line-height: 1.4em;
            color: #f0f1f2;
        }

        .line-numbers {
            flex-basis: 30px;
            text-align: right;
            width: 40px;
            height: 100%;
            font-family: monospace;
            font-size: 1.1em;
            padding-right: 6px;
            box-sizing: border-box;
            line-height: 1.4em;
            opacity: 0.3;

            span {
                counter-increment:  linenumber;
            }

            span::before {
                content: counter(linenumber);
                display: block;
                color: #f0f1f2;
            }
        }
    }

    .output-container {
        width: 100%;
        position: relative;
        box-sizing: border-box;
        min-height: 200px;
        display: flex;
        flex-direction: column;

        .charged-bar {
            padding-top: 6px;
            padding-bottom: 6px;
            position: absolute;
            top: -6px;
            width: 100%;
            cursor: row-resize;
        }

        .charged-bar::before {
            content: "";
            width: 100%;
            height: 4px;
            background-color: var(--purple-gray);
            display: block;
        }

        .content {
            flex: 1 1;
            background-color: var(--context-background);
            display: flex;
            flex-direction: column;

            .toolbar {
                text-align: right;
                background-color: #202224;
                padding-bottom: 6px;
                padding: 6px;
                padding-top: 8px;
            }

            .results {
                flex: 1 1 0;
                padding-left: 8px;
                color: #f0f1f2;
                font-family: monospace;
                overflow: auto;
                white-space: pre-wrap;
                table {
                    th {
                        text-decoration: underline;
                        text-transform: uppercase;
                        text-align: left;
                        padding-left: 4px;
                        padding-right: 4px;
                    }

                    td {
                        text-align: center;
                    }
                }
            }
        }
    }

`;

const StyledLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    flex: 1;
    background-color: var(--dark-purple);
    color: #f0f1f2;
    flex-direction: column;
`;

type Props = {
    initialCode: string;
}

const lineHeight = 18;

export function CodeWrapper({ initialCode }: Props) {
    const [editorCode, setEditorCode] = useState(initialCode);
    const resetEditorCode = useRef(initialCode);
    const [numLines, setNumLines] = useState(50);
    const textArea = useRef<HTMLTextAreaElement | null>(null);
    const lineArea = useRef<HTMLDivElement | null>(null);
    const outputContainer = useRef<HTMLDivElement | null>(null);
    const textAreaHeight = useRef(0);
    const draggingOutputBar = useRef(false); // horizontal bar between code and output
    const draggingFlexBar = useRef(false); // vertical bar between instructions and code
    const resizeObserver = useRef<ResizeObserver | null>(null);
    const parentContainer = useRef<HTMLDivElement | null>(null);
    const [error, setError] = useState<null | string>(null);
    // const [results, setResults] = useState<Results | null>(null);
    const [results, setResults] = useState<String | null>(null);
    const isReady = useCompiler();
    const history = useRef<string[]>([]);

    useLayoutEffect(() => {
        if (textArea.current) {
            const height = textArea.current.scrollHeight;
            setNumLines(Math.ceil(height / lineHeight));
            textAreaHeight.current = height;
            resizeObserver.current = new ResizeObserver(() => {}); // Note: we don't need to run the callback, we only care about when the event is fired
        }
        return () => {
            if (resizeObserver.current) {
                resizeObserver.current.disconnect;
            }
        }
    }, [])

    useEffect(() => {
        function handleMouseMove(e: MouseEvent) {
            if (draggingOutputBar.current) {
                e.preventDefault();
                // get the mouse's current position related to the container's position and height
                // if the current position is higher, then change the height
                if (outputContainer.current) {
                    const bbox = outputContainer.current.getBoundingClientRect();
                    // constrain to not outgrow its parent
                    const parentBbox = outputContainer.current.parentElement?.getBoundingClientRect();
                    if (parentBbox) {
                        const newHeight = Math.max(200, Math.min((bbox.top - e.clientY) + bbox.height, parentBbox.height - 200)); // clamping
                        outputContainer.current.style.height = `${newHeight}px`;
                    }
                }
            }
            if (draggingFlexBar.current) {
                e.preventDefault();
                if (parentContainer.current) {
                    const bbox = parentContainer.current.getBoundingClientRect();
                    const parentBbox = parentContainer.current.parentElement?.getBoundingClientRect();
                    if (parentBbox) {
                        // Uncomment this and set min-width on code.tsx and instructions.tsx if we want to prevent full collapse
                        // const newWidth = Math.min(parentBbox.width - 200, Math.max((bbox.left - e.clientX) + bbox.width, 200)); // clamping
                        const newWidth = Math.min(parentBbox.width, Math.max((bbox.left - e.clientX) + bbox.width, 4)); // clamping
                        parentContainer.current.style.width = `${newWidth}px`;
                    }
                    
                }
            }
        }

        // Note: we don't pass the entries because we already have a global reference to the text area
        function handleResize() {
            handleSetLineNums();
        }

        if (textArea.current) {
            const observer = new ResizeObserver(handleResize);
            observer.observe(textArea.current);
            resizeObserver.current = observer;

        }

        function handleMouseUp() {
            draggingOutputBar.current = false;
            draggingFlexBar.current = false;
        }
        
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            if (resizeObserver.current) {
                resizeObserver.current.disconnect();
            }
        }
    }, []);

    // centralized location to enable history
    const handleSetCode = (code: string) => {
        // store up to 100 previous keystrokes to prevent consuming too much memory
        if (history.current.length === 100) {
            history.current.shift();
        }
        history.current.push(editorCode); // push the current state
        setEditorCode(code);
    };

    const handleChangeCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleSetCode(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const textArea = e.currentTarget;
            textArea.setRangeText(
                '\t',
                textArea.selectionStart,
                textArea.selectionEnd,
                'end'
            );
            handleSetCode(textArea.value);
        }
        if (e.key === 'z' && e.ctrlKey) {
            e.preventDefault();
            const previousCode = history.current.pop();
            if (previousCode) {
                setEditorCode(previousCode);
            }
        }

        if (e.shiftKey && e.key == 'Enter') {
            e.preventDefault();
            handleRun();
        }
    };

    const handleSetLineNums = () => {
        if (textArea.current) {
            if (lineArea.current) {
                // see if we need to add more lines
                const height = textArea.current.scrollHeight;
                if (height > textAreaHeight.current) {
                    setNumLines(Math.ceil(height / lineHeight));
                    textAreaHeight.current = height;
                }
                lineArea.current.style.marginTop = `${(-textArea.current.scrollTop).toString()}px`;
            }
        }
    }

    // TODO: add some debouncing here to avaoid too many calls
    // Note: This fires when adding/removing lines with the keyboard as well
    const handleScrollTextArea = handleSetLineNums;

    const handleDragOutputBar = () => {
        draggingOutputBar.current = true;
    };

    const handleDragFlexBar = () => {
        draggingFlexBar.current = true;
    };

    const lines = useMemo(() => new Array(numLines).fill(0), [numLines]);

    const handleRun = async () => {
        if (typeof window.RunScript !== undefined) {
            try {
                const results = await RunScript(editorCode);
                setError(null);
                console.log(results);
                setResults(results);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError(e);
                }
                console.log(e);
            }
        } else {
            alert('Problem loading HookScript interpreter; please refresh the page or try a new browser');
        }
    };

    const handleReset = () => {
        setEditorCode(resetEditorCode.current);
        history.current = [];
    }

    return (
        <StyledCode ref={parentContainer}>
            { !isReady
            
                ? 
                <StyledLoading>
                    <CircularProgress color="inherit"/>
                    <p>Loading Playground</p>
                    <p>{Date.now()}</p>
                </StyledLoading>

                :
            <>
                <div className="code-container">
                    <div className="line-numbers" ref={lineArea}>
                        {lines.map((_, i) => <span key={i}></span>)}
                    </div>
                    <textarea
                        className="text-area"
                        value={editorCode}
                        onChange={handleChangeCode}
                        onKeyDown={handleKeyDown}
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        wrap="off"
                        ref={textArea}
                        onScroll={handleScrollTextArea}
                    />
                </div>
                <div
                    className="output-container"
                    ref={outputContainer}
                    >
                    <div
                        className="charged-bar"
                        onMouseDown={handleDragOutputBar}
                    >
                    </div>
                    <div className="content">
                        <div className="toolbar">
                            <Button
                                variant="text"
                                style={{
                                    fontSize: "1.4rem",
                                    marginRight: "6px",
                                    color: "var(--purple)",
                                }}
                                onClick={handleReset}
                            >
                                Reset Editor
                            </Button>
                            <Button
                                style={{
                                    fontSize: "1.4rem",
                                    backgroundColor: "var(--blue-accent)",
                                    color: "white",
                                }}
                                onClick={handleRun}
                                title="Run this code [shift-enter]"
                            >
                                Run Code
                            </Button>
                        </div>
                        <div className="results">
                            { error 
                            ?
                                <span>{error}</span>
                            :
                                // resultsTable
                                <code>{results}</code>
                            }
                        </div>
                    </div>
                </div>
            </>
            }
            <div
                className="charged-resize-bar"
                onMouseDown={handleDragFlexBar}
            >
            </div>
        </StyledCode>
    )
}
