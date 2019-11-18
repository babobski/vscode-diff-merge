import { ExecSyncOptionsWithStringEncoding } from 'child_process';

export const fileNotSupported = 'The file is not displayed in the editor because it is either binary or uses an unsupported text encoding';
export const UNSAVED_SYMBOL = ' •';
export const utf8Stream: ExecSyncOptionsWithStringEncoding = {
  encoding: 'utf8'
};