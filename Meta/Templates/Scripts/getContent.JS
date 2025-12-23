module.exports = async (params) => {
  const { quickAddApi, app } = params;

  // Get all markdown files in the vault
  const files = app.vault.getMarkdownFiles();

  // Show a suggester to let the user pick a file
  const selectedFile = await quickAddApi.suggester(
    (file) => file.basename, // What to display to the user
    files // The array of files to choose from
  );

  // If the user cancels the selection, exit the script
  if (!selectedFile) {
    return;
  }

  // Read the content of the selected file
  const content = await app.vault.read(selectedFile);

  // Set a QuickAdd variable with the content of the note
  params.variables["noteContent"] = content;
};