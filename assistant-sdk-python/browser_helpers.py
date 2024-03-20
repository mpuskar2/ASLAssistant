# Copyright (C) 2018 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os.path
import tempfile
import webbrowser

class SystemBrowser(object):
    def __init__(self):
        self.tempdir = tempfile.mkdtemp()
        
    def display(self, html, filename):
        full_filename = os.path.join(os.getcwd(), filename)
        with open(full_filename, 'wb') as f:
            f.write(html)
        webbrowser.open(full_filename, new=0)


system_browser = SystemBrowser()
